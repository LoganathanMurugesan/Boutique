namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered() { }

        public ProductItemOrdered(int productId, string productName, string pictureUrl)
        {
            this.ProductId = productId;
            this.ProductName = productName;
            this.PictureUrl = pictureUrl;

        }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}