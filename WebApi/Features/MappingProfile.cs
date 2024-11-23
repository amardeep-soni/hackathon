using AutoMapper;
using WebApi.Entities;
using WebApi.Features;
namespace WebApi.Fetatures
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<CampsDto, CampStagging>()
			.ForMember(dest => dest.ActivitiesOffered,
				opt => opt.MapFrom(src => string.Join("@#", src.ActivitiesOffered)))
			.ForMember(dest => dest.TestimonialsOrReviews,
				opt => opt.MapFrom(src => string.Join("@#", src.TestimonialsOrReviews)))
			.ForMember(dest => dest.DatesAndDurations,
				opt => opt.MapFrom(src => string.Join("@#", src.DatesAndDurations)))
			.ForMember(dest => dest.ClassSchedule,
				opt => opt.MapFrom(src => string.Join("@#", src.ClassSchedule)));

			CreateMap<Camp, CampsDto>()
				.ForMember(dest => dest.ActivitiesOffered,
					opt => opt.MapFrom(src => src.ActivitiesOffered.Split(new[] { "@#" }, StringSplitOptions.None)))
				.ForMember(dest => dest.TestimonialsOrReviews,
					opt => opt.MapFrom(src => src.TestimonialsOrReviews.Split(new[] { "@#" }, StringSplitOptions.None)))
				.ForMember(dest => dest.DatesAndDurations,
					opt => opt.MapFrom(src => src.DatesAndDurations.Split(new[] { "@#" }, StringSplitOptions.None)))
				.ForMember(dest => dest.ClassSchedule,
					opt => opt.MapFrom(src => src.ClassSchedule.Split(new[] { "@#" }, StringSplitOptions.None)));

		}
	}
}