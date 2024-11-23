using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using WebApi.Entities;
using WebApi.Features;
using WebApi.Repositories;

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
						response.EnsureSuccessStatusCode();

						// Read the JSON response
						string jsonResponse = await response.Content.ReadAsStringAsync();
						var courseDto = JsonConvert.DeserializeObject<List<CampsDto>>(jsonResponse);
						var courses = _mapper.Map<List<CampStagging>>(courseDto);

						if (courses.Count > 0)
						{
							// Clear Staging Table
							await _dbContext.Database.ExecuteSqlRawAsync("TRUNCATE TABLE CampStaggings");

							// Insert into Staging Table
							await _dbContext.CampStaggings.AddRangeAsync(courses);
							await _dbContext.SaveChangesAsync();
							// Merge Staging Table into Main Table
							string mergeQuery = @"
							SET IDENTITY_INSERT Camps ON;

							MERGE INTO Camps AS Target
							USING CampStaggings AS Source
							ON Target.Id = Source.Id
							WHEN MATCHED THEN 
								UPDATE SET 
									Target.CampName = Source.CampName, 
									Target.Address = Source.Address,
									Target.Email = Source.Email,
									Target.Phone = Source.Phone,
									Target.ActivitiesOffered = Source.ActivitiesOffered,
									Target.DatesAndDurations = Source.DatesAndDurations,
									Target.AgeGroup = Source.AgeGroup,
									Target.CostsAndScholarships = Source.CostsAndScholarships,
									Target.TestimonialsOrReviews = Source.TestimonialsOrReviews,
									Target.ClassSchedule = Source.ClassSchedule,
									Target.Gender = Source.Gender,
									Target.Price = Source.Price,
									Target.StartDate = Source.StartDate,
									Target.EndDate = Source.EndDate,
									Target.Capacity = Source.Capacity,
									Target.RegistrationDeadline = Source.RegistrationDeadline,
									Target.SpotsAvailable = Source.SpotsAvailable,
									Target.Highlights = Source.Highlights,
									Target.Language = Source.Language,
									Target.Category = Source.Category,
									Target.HostedBy = Source.HostedBy,
									Target.CampLink = Source.CampLink,
									Target.ImageLink = Source.ImageLink
							WHEN NOT MATCHED BY Target THEN
								INSERT (Id, CampName, Address, Email, Phone, ActivitiesOffered, DatesAndDurations, AgeGroup, CostsAndScholarships, TestimonialsOrReviews, ClassSchedule, Gender, Price, StartDate, EndDate, Capacity, RegistrationDeadline, SpotsAvailable, Highlights, Language, Category, HostedBy, CampLink, ImageLink)
								VALUES (Source.Id, Source.CampName, Source.Address, Source.Email, Source.Phone, Source.ActivitiesOffered, Source.DatesAndDurations, Source.AgeGroup, Source.CostsAndScholarships, Source.TestimonialsOrReviews, Source.ClassSchedule, Source.Gender, Source.Price, Source.StartDate, Source.EndDate, Source.Capacity, Source.RegistrationDeadline, Source.SpotsAvailable, Source.Highlights, Source.Language, Source.Category, Source.HostedBy, Source.CampLink, Source.ImageLink)
							WHEN NOT MATCHED BY Source THEN
								DELETE;

							SET IDENTITY_INSERT Camps OFF;
							";
							await _dbContext.Database.ExecuteSqlRawAsync(mergeQuery);
						}
					}
					catch
					{
						continue;
					}
				}
			}
		}
	}
}