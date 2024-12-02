using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cafe.Application.Interfaces;
using Cafe.Infrastructure.DomainModels;
using Cafe.Infrastructure.Repositories.Interfaces;

namespace Cafe.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<int> CreateEmployee(Employee employee)
        {
            return await _employeeRepository.CreateEmployee(employee);
        }

        public async Task<int> DeleteEmployee(Employee employee)
        {
            return await _employeeRepository.DeleteEmployee(employee);
        }

        public async Task<int> DeleteEmployeeByCafeId(Guid cafeId)
        {
            return await _employeeRepository.DeleteEmployeeByCafeId(cafeId);
        }

        public async Task<Employee> GetEmployeeById(string id)
        {
            return await _employeeRepository.GetEmployeeById(id);
        }

        public async Task<List<Employee>> GetEmployeesByCafeId(Guid cafeId)
        {
            return await _employeeRepository.GetEmployeesByCafeId(cafeId);
        }

        public async Task<int> UpdateEmployee(Employee employee)
        {
            return await  _employeeRepository.UpdateEmployee(employee);
        }
    }
}
