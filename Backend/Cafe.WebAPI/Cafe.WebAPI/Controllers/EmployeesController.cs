using Cafe.Infrastructure.DomainModels;
using Cafe.Infrastructure.Data;
using Cafe.WebAPI.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cafe.Application.Interfaces;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cafe.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployees([FromQuery] Guid? cafeId)
        {
            if (cafeId == null)
            {
                return Ok();
            }

            var employeeList = await _employeeService.GetEmployeesByCafeId(cafeId.Value);
            return Ok(employeeList);
        }


        [HttpPost("employee")]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto employeeDto)
        {
            var employee = new Employee
            {
                Id = "UI" + new Random().Next(1000000, 9999999),  // Generate unique employee ID
                Name = employeeDto.Name,
                EmailAddress = employeeDto.EmailAddress,
                PhoneNumber = employeeDto.PhoneNumber,
                Gender = employeeDto.Gender,
                StartDate =  DateTime.Now,
                CafeId = employeeDto.CafeId
            };

            var result= await _employeeService.CreateEmployee(employee);

            return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employee);
        }

        [HttpPut("employee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeDto employeeDto)
        {

            var employeeObj = await _employeeService.GetEmployeeById(employeeDto.Id);
            if (employeeObj == null) return NotFound();

            employeeObj.Name = employeeDto.Name;
            employeeObj.EmailAddress = employeeDto.EmailAddress;
            employeeObj.PhoneNumber = employeeDto.PhoneNumber;
            employeeObj.Gender = employeeDto.Gender;
            
            if (employeeDto.CafeId != employeeObj.CafeId)
                employeeObj.StartDate = DateTime.Now;

            employeeObj.CafeId = employeeDto.CafeId;  // Assign to a new café if needed

            var result = await _employeeService.UpdateEmployee(employeeObj);
            return NoContent();
        }

        [HttpDelete("employee")]
        public async Task<IActionResult> DeleteEmployee([FromQuery] string id)
        {

            var employee = await _employeeService.GetEmployeeById(id);
            if (employee == null) return NotFound();

            var result = await _employeeService.DeleteEmployee(employee);

            return NoContent();
        }

        [HttpGet("employee")]
        public async Task<IActionResult> GetEmployeeById([FromQuery] string id)
        {

            var employeeList = await _employeeService.GetEmployeeById(id);
            return Ok(employeeList);
        }
    }
}
