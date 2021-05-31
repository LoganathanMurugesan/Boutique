using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public PaymentService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }
        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
           StripeConfiguration.ApiKey = _configuration["StripeSettings:Secretkey"];

           var basket = await _basketRepo.GetBasketAsync(basketId);

           var shippingPrice = 0m;

           if (basket == null) return null;

            if(basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync((int)basket.DeliveryMethodId);
                shippingPrice = deliveryMethod.Price;
            }

            foreach(var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.Id);

                if(item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            var service = new PaymentIntentService();

            PaymentIntent intent;

            if(string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var intentOptions = new PaymentIntentCreateOptions
                {
                    //stripe does not accept decimal so converting into long and also mutiplying by 100
                    Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
                    Currency = "inr",
                    PaymentMethodTypes = new List<string> { "card" },
                    Shipping = new ChargeShippingOptions
                    {
                        Name = "Jenny Rosen",
                        Address = new AddressOptions
                        {
                            Line1 = "510 Townsend St",
                            PostalCode = "98140",
                            City = "San Francisco",
                            State = "CA",
                            Country = "US",
                        },
                    },
                    Description = "Software development services"
                };
                intent = await service.CreateAsync(intentOptions);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    //stripe does not accept decimal so converting into long and also mutiplying by 100
                    Amount = (long) basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long) shippingPrice * 100,
                   
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);                
            }

            await _basketRepo.UpdateBasketAsync(basket);

            return basket;

        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

             if(order == null) return null;
            
            order.Status = OrderStatus.PaymentFailed;

            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if(order == null) return null;
            
            order.Status = OrderStatus.PaymentReceived;
            _unitOfWork.Repository<Order>().Update(order);

            await _unitOfWork.Complete();

            return order;
        }
    }
}