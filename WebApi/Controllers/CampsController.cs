using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Repositories;

namespace WebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CampsController(CampsRepository _campsRepo) : ControllerBase
	{
		[HttpGet("GetAll")]
		public async Task<ActionResult<List<Camp>>> GetAll()
		{
			var camps = await _campsRepo.GetAll();
			return camps;
		}
		[HttpGet("GetById")]
		public async Task<ActionResult<Camp>> GetById(int id)
		{
			var camp = await _campsRepo.GetById(id);
			return camp;
		}

		[HttpPost("Create")]
		public async Task<IActionResult> Create()
		{
			await _campsRepo.Create();
			return Ok("Added Successfully");
		}
	}
}
