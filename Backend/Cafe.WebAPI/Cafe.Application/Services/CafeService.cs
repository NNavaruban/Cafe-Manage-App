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
    public class CafeService : ICafeService
    {
        private readonly ICafeRepository _cafeRepository;

        public CafeService(ICafeRepository cafeRepository)
        {
            _cafeRepository = cafeRepository;
        }
        public async Task<int> AddCafe(CafeClass cafe)
        {
            return await _cafeRepository.AddCafe(cafe);
        }

        public async Task<List<CafeClass>> CafesByLocation(string location)
        {
            return await _cafeRepository.CafesByLocation(location);
        }

        public async Task<int> DeleteCafe(CafeClass cafe)
        {
           return await _cafeRepository.DeleteCafe(cafe);
        }

        public async Task<CafeClass> GetCafeById(Guid cafeId)
        {
            return await _cafeRepository.GetCafeById(cafeId);
        }

        public Task<List<CafeClass>> GetCafes()
        {
            return _cafeRepository.GetCafes();
        }

        public Task<List<string>> GetLocations()
        {
            return _cafeRepository.GetLocations();
        }

        public async Task<int> UpdateCafe(CafeClass cafe)
        {
            return await _cafeRepository.UpdateCafe(cafe);
        }
    }
}
