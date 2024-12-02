namespace Cafe.WebAPI.Models.Dto
{
    public class CreateEmployeeDto
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public Guid CafeId { get; set; }
    }
}
