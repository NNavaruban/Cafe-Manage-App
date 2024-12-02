using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cafe.Infrastructure.DomainModels;
using Cafe.Infrastructure.Repositories.Interfaces;
using Cafe.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Cafe.Infrastructure.Repositories.Implementations
{
    public class CafeRepository : ICafeRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public CafeRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        public async Task<List<CafeClass>> CafesByLocation(string location)
        {
            var cafeList = await _applicationDbContext.Cafe.Include(c => c.Employees).Where(x => x.Location == location || String.IsNullOrEmpty(location)).ToListAsync();
            return cafeList;
        }

        public async Task<CafeClass> GetCafeById(Guid cafeId)
        {
            return await _applicationDbContext.Cafe.FindAsync(cafeId);
        }

        public async Task<int> AddCafe(CafeClass cafe)
        {
           await _applicationDbContext.AddAsync(cafe);
            var result =await _applicationDbContext.SaveChangesAsync();
            return result;
        }

        public async Task<int> UpdateCafe(CafeClass cafe)
        {
            _applicationDbContext.Update(cafe);
            var reuslt = await _applicationDbContext.SaveChangesAsync();
            return reuslt;
        }

        public async Task<int> DeleteCafe(CafeClass cafe)
        {

            _applicationDbContext.Remove(cafe);
            var result = await _applicationDbContext.SaveChangesAsync();
            return result;
        }

        public Task<List<CafeClass>> GetCafes()
        {
            return _applicationDbContext.Cafe.ToListAsync();
        }

        public async Task<List<string>> GetLocations()
        {
            return await _applicationDbContext.Cafe.Select(x => x.Location).Distinct().ToListAsync();

        }
    }
}
