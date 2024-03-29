using System;
using System.Collections.Generic;
using Core.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderToReturnDto
    {
        
         public string BuyerEmail { get; set; }
        public DateTimeOffset Orderdate { get; set; } 
        public Address ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
    }
}