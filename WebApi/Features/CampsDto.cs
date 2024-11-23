namespace WebApi.Features
{
	public class CampsDto
	{
		public string CampName { get; set; }
		public string Address { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public List<string> ActivitiesOffered { get; set; }
		public List<string> DatesAndDurations { get; set; }
		public string AgeGroup { get; set; }
		public string CostsAndScholarships { get; set; }
		public List<string> TestimonialsOrReviews { get; set; }
		public List<string> ClassSchedule { get; set; }
		public string Gender { get; set; }
		public string Price { get; set; }
		public string StartDate { get; set; }
		public string EndDate { get; set; }
		public string Capacity { get; set; }
		public string RegistrationDeadline { get; set; }
		public string SpotsAvailable { get; set; }
		public string Highlights { get; set; }
		public string Language { get; set; }
		public string Category { get; set; }
		public string CampLink { get; set; }
		public string ImageLink { get; set; }
		public string HostedBy { get; set; }
	}
}
