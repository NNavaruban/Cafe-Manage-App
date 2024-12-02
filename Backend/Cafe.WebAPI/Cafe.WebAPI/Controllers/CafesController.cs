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
    public class CafesController : ControllerBase
    {
        private readonly ICafeService _cafeService;
        private readonly IEmployeeService _employeeService;

        public CafesController(ApplicationDbContext applicationDbContext,ICafeService cafeService, IEmployeeService employeeService)
        {
           _cafeService = cafeService;
            _employeeService = employeeService;
        }

        [HttpGet("allCafes")]
        public async Task<IActionResult> AllCafes()
        {
            
            var cafeObj = await _cafeService.GetCafes();
            return Ok(cafeObj);
        }

        [HttpGet("cafes")]
        public async Task<IActionResult> GetCafes([FromQuery] string location = null)
        {
            var cafes = await _cafeService.CafesByLocation(location);


            List<CafeDto> cafeList = cafes.Select(x => new CafeDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Location = x.Location,
                EmplyeeCount = (int)x.Employees.Count() 
            }).ToList();


            return Ok(cafeList);
        }

        [HttpGet("cafe")]
        public async Task<IActionResult> GetCafe([FromQuery] Guid id)
        {
            var cafeObj = await _cafeService.GetCafeById(id);
            return Ok(cafeObj);
        }


        [HttpPost("cafe")]
        public async Task<IActionResult> CreateCafe([FromBody] CreateCafeDto cafeDto)
        {
            var cafe = new CafeClass
            {
                Id = Guid.NewGuid(),
                Name = cafeDto.Name,
                Description = cafeDto.Description,
                Location = cafeDto.Location
            };


            var result = await _cafeService.AddCafe(cafe);
            return CreatedAtAction(nameof(GetCafes), new { id = cafe.Id }, cafe);
        }

        [HttpPut("cafe")]
        public async Task<IActionResult> UpdateCafe([FromBody] UpdateCafeDto cafeDto)
        {

            var cafeObj = await _cafeService.GetCafeById(cafeDto.Id);
            if (cafeObj == null) return NotFound();

            cafeObj.Name = cafeDto.Name;
            cafeObj.Description = cafeDto.Description;
            cafeObj.Location = cafeDto.Location;

            var result = await _cafeService.UpdateCafe(cafeObj);
            return Ok();
        }


        [HttpDelete("cafe")]
        public async Task<IActionResult> DeleteCafe([FromQuery] Guid id)
        {
            var cafeObj = await _cafeService.GetCafeById(id);
            if (cafeObj == null) return NotFound();

            var reult = await _cafeService.DeleteCafe(cafeObj);
            var empResult = await _employeeService.DeleteEmployeeByCafeId(id);

            return NoContent();
        }



        [HttpGet("locations")]
        public async Task<IActionResult> GetCafeLocations()
        {
            var locations = await _cafeService.GetLocations();
            return Ok(locations);
        }
    }
}
