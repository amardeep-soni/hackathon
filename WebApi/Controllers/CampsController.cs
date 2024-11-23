using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Features;
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
			return Ok(camps);
		}
		[HttpGet("GetById")]
		public async Task<ActionResult<CampsDto>> GetById(int id)
		{
			var camp = await _campsRepo.GetById(id);
			return Ok(camp);
		}

		[HttpPost("Create")]
		public async Task<IActionResult> Create()
		{
			await _campsRepo.Create();
			return Ok("Added Successfully");
		}
	}
}
