using Cafe.Infrastructure.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Infrastructure.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<CafeClass> Cafe { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for cafes and employees

            var cafeId1 = Guid.NewGuid();
            var cafeId2 = Guid.NewGuid();
       

            modelBuilder.Entity<CafeClass>().HasData(
                new CafeClass { Id = cafeId1, Name = "Swee Lee Cafe", Location = "Novena", Description = "Swee Lee Social Club is our in-store signature cafe and social event space" },
                new CafeClass { Id = cafeId2, Name = "Wild Honey", Location = "Bishan", Description = "Wild Honey was inspired by our love for travel and a passion for all things breakfast" }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = "UI0000001", Name = "Ivy", EmailAddress = "ivy19@gmail.com", PhoneNumber = "89221344", Gender = "Female", CafeId = cafeId1, StartDate = DateTime.Now },
                new Employee { Id = "UI0000002", Name = "Willium", EmailAddress = "Willium.joe@hotmail.com", PhoneNumber = "98346610", Gender = "Male", CafeId = cafeId1, StartDate = DateTime.Now },
                new Employee { Id = "UI0000003", Name = "Ashton", EmailAddress = "Ashton.branton@yahoo.com", PhoneNumber = "84297635", Gender = "Female", CafeId = cafeId2, StartDate = DateTime.Now },
                new Employee { Id = "UI0000004", Name = "Ellis", EmailAddress = "Ellis.ivan@gmail.com", PhoneNumber = "80661011", Gender = "Female", CafeId = cafeId2, StartDate = DateTime.Now },
                new Employee { Id = "UI0000005", Name = "Oliver", EmailAddress = "Oliver.raw@gmail.com", PhoneNumber = "82003301", Gender = "Female", CafeId = cafeId2, StartDate = DateTime.Now },
                new Employee { Id = "UI0000006", Name = "Haley", EmailAddress = "jane.Haley@gmail.com", PhoneNumber = "74502211", Gender = "Male", CafeId = cafeId1, StartDate = DateTime.Now },
                new Employee { Id = "UI0000007", Name = "Harvey", EmailAddress = "Harvey.smith@yahoo.com", PhoneNumber = "86441290", Gender = "Female", CafeId = cafeId2, StartDate = DateTime.Now },
                new Employee { Id = "UI0000008", Name = "Colton", EmailAddress = "Colton@yahoo.com", PhoneNumber = "96450000", Gender = "Male", CafeId = cafeId1, StartDate = DateTime.Now },
                new Employee { Id = "UI0000009", Name = "Chris", EmailAddress = "Chris@hotmail.com", PhoneNumber = "98104381", Gender = "Male", CafeId = cafeId1, StartDate = DateTime.Now },
                new Employee { Id = "UI00000010", Name = "Victor", EmailAddress = "victor@yahoo.com", PhoneNumber = "83206011", Gender = "Male", CafeId = cafeId1, StartDate = DateTime.Now }


            );
        }
    }
}
