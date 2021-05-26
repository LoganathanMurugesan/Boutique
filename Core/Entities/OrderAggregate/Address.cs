namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address(){}
        public Address(string firstName, string lastName, string streetName, string city, string state)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.StreetName = streetName;
            this.City = city;
            this.State = state;

        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StreetName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}