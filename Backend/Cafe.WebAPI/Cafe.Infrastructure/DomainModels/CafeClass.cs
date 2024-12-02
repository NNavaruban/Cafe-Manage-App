namespace Cafe.Infrastructure.DomainModels
{
    public class CafeClass
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }

        public ICollection<Employee>? Employees { get; set; }  // Navigation property
    }
}
