using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cafe.Infrastructure.Data;
using Cafe.Infrastructure.DomainModels;
using Cafe.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cafe.Infrastructure.Repositories.Implementations
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public EmployeeRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        public async Task<int> CreateEmployee(Employee employee)
        {
            await _applicationDbContext.Employee.AddAsync(employee);
            return await _applicationDbContext.SaveChangesAsync();
        }

        public async Task<int> DeleteEmployee(Employee employee)
        {
            _applicationDbContext.Employee.Remove(employee);
            var result = await _applicationDbContext.SaveChangesAsync();
            return result;
        }

        public async Task<int> DeleteEmployeeByCafeId(Guid cafeId)
        {
            var employeesToDelete = _applicationDbContext.Employee.Where(x => x.CafeId == cafeId).ToList();
            _applicationDbContext.Employee.RemoveRange(employeesToDelete);
            var result = await _applicationDbContext.SaveChangesAsync();
            return result;
        }

        public async Task<Employee> GetEmployeeById(string id)
        {
            return await _applicationDbContext.Employee.FindAsync(id);
        }

        public async Task<List<Employee>> GetEmployeesByCafeId(Guid cafeId)
        {
            return await _applicationDbContext.Employee.Where(e => e.CafeId == cafeId).ToListAsync();
        }

        public async Task<int> UpdateEmployee(Employee employee)
        {
             _applicationDbContext.Update(employee);
            return await _applicationDbContext.SaveChangesAsync();
        }
    }
}
