using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cafe.Infrastructure.DomainModels;

namespace Cafe.Infrastructure.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>>GetEmployeesByCafeId(Guid cafeId);
        Task<Employee>GetEmployeeById(string id);
        Task<int>CreateEmployee(Employee employee);
        Task<int>UpdateEmployee(Employee employee); 
        Task<int>DeleteEmployee(Employee employee);
        Task<int> DeleteEmployeeByCafeId(Guid cafeId);
    }
}
