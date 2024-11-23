using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Features;

namespace WebApi.Repositories
{
	public class CampsRepository(CampsDbContext _dbContext, ScrappingRepository _scrappingRepository, IMapper _mapper)
	{
		public async Task<List<Camp>> GetAll()
		{
			var camps = await _dbContext.Camps.ToListAsync();
			return camps;
		}
		
		public async Task<CampsDto> GetById(int id)
		{
			var camp = await _dbContext.Camps.FirstOrDefaultAsync(c => c.Id == id);
			var campDto = _mapper.Map<CampsDto>(camp);
			return campDto;
		}
		
		public async Task Create()
		{
			await _scrappingRepository.SaveScrappingData();
		}
	}
}
