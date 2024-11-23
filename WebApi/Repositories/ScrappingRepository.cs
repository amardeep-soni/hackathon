using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebApi.Entities;
using WebApi.Features;
namespace WebApi.Repositories
{
	public class ScrappingRepository(CampsDbContext _dbContext, IMapper _mapper)
	{
		public async Task SaveScrappingData()
		{
			var urls = new List<string> { "https://test-flask-six-sigma.vercel.app/api/courses"};  // URL of your Flask API
			using (HttpClient client = new HttpClient())
			{
				await _dbContext.Database.ExecuteSqlRawAsync("TRUNCATE TABLE Camps");
				foreach (var url in urls)
				{

					try
					{
						// Send GET request to Flask API
						HttpResponseMessage response = await client.GetAsync(url);
						response.EnsureSuccessStatusCode(); // Throws an exception if the HTTP response status is an error
															// Read the JSON response as a string
						string jsonResponse = await response.Content.ReadAsStringAsync();
						// Deserialize the JSON string into a list of Course objects
						var campsDto = JsonConvert.DeserializeObject<List<CampsDto>>(jsonResponse);
						var camps = _mapper.Map<List<Camp>>(campsDto);
						if (camps.Count > 0)
						{
							await _dbContext.Camps.AddRangeAsync(camps);
							await _dbContext.SaveChangesAsync();
						}
						else
						{
							continue;
						}
						
					}
					catch (HttpRequestException e)
					{
						continue;
					}
				}
			}
		}
	}
}