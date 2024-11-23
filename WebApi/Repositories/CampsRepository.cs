using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.Repositories
{
	public class CampsRepository(CampsDbContext _dbContext, ScrappingRepository _scrappingRepository)
	{
		public async Task<List<Camp>> GetAll()
		{
			var camps = await _dbContext.Camps.ToListAsync();
			return camps;
		}
		
		public async Task<Camp> GetById(int id)
		{
			var camp = await _dbContext.Camps.FirstOrDefaultAsync(c => c.Id == id);
			return camp;
		}
		
		public async Task Create()
		{
			await _scrappingRepository.SaveScrappingData();
		}
	}
}
