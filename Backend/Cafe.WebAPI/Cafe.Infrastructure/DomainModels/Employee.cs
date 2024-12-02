namespace Cafe.Infrastructure.DomainModels
{
    public class Employee
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public Guid CafeId { get; set; }
        public DateTime? StartDate { get; set; }
        public CafeClass Cafe { get; set; }  // Navigation property
    }
}
