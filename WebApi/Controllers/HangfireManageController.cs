using Azure.Core;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Fetatures;
using WebApi.Repositories;

namespace WebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class HangfireManageController : ControllerBase
	{
		private readonly ScrappingRepository _scrappingRepo;

		public HangfireManageController(ScrappingRepository scrappingRepo)
		{
			_scrappingRepo = scrappingRepo;
		}

		// Enqueue a background job with a specific schedule
		[HttpPost("CreateJob")]
		public IActionResult CreateJob( string frequency)
		{
			string cronExpression = frequency.ToLower() switch
			{
				"daily" => "0 0 * * *",  // Daily at midnight
				"weekly" => "0 0 * * 0", // Weekly on Sunday at midnight
				"monthly" => "0 0 1 * *", // Monthly on the 1st day of the month at midnight
				"yearly" => "0 0 1 1 *",  // Yearly on January 1st at midnight
				_ => null // Invalid frequency
			};

			if (string.IsNullOrEmpty(cronExpression))
			{
				return BadRequest(new { Message = "Invalid frequency. Valid options are: daily, weekly, monthly, yearly." });
			}

			// Schedule the job using Hangfire
			RecurringJob.AddOrUpdate(
				"SaveScrappingData",
				() => _scrappingRepo.SaveScrappingData(),
				cronExpression
			);

			return Ok(new { Message = "Job Scheduled successfully." });
		}
	}
}
