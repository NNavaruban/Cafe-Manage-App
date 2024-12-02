using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cafe.Infrastructure.DomainModels;

namespace Cafe.Application.Interfaces
{
    public interface ICafeService
    {
        Task<List<CafeClass>> GetCafes();
        Task<List<CafeClass>> CafesByLocation(string location);
        Task<CafeClass> GetCafeById(Guid cafeId);

        Task<int> AddCafe(CafeClass cafe);
        Task<int> UpdateCafe(CafeClass cafe);
        Task<int> DeleteCafe(CafeClass cafe);
        Task<List<string>> GetLocations();
    }
}
