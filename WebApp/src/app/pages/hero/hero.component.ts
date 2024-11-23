import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import {
  Camp,
  CampsServiceProxy,
} from '../../../shared/service-proxies/service-proxies';
import { CommonModule, SlicePipe } from '@angular/common';
import { gsap } from 'gsap';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SlicePipe, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {
  constructor(public _campsService: CampsServiceProxy) {}

  // camps: Camp[] = [];
  camps = [];
  router = inject(Router);

  ngOnInit() {
    // this._campsService.getAll().subscribe((data) => {
    //   // this.camps = data;
    //   console.log(this.camps);
    // });
    this.loadAnimation()
    this.camps = [
      {
        id: 1,
        campName: 'Adventure Summer Camp',
        address: '123 Forest Lane, Springfield, USA',
        email: 'info@adventuresummercamp.com',
        phone: '123-456-7890',
        activitiesOffered: 'Hiking@#Kayaking@#Archery@#Rock Climbing',
        datesAndDurations: 'June 1 - June 15@#July 1 - July 15',
        ageGroup: '8-14 years',
        costsAndScholarships: 'Standard: $500/week, Scholarships Available',
        testimonialsOrReviews:
          'Best camp ever! - John D.@#My kids loved it. - Sarah L.',
        classSchedule: 'Morning Yoga@#Team Activities@#Evening Campfire',
        gender: 'Co-ed',
        price: '$500 per week',
        startDate: '2024-06-01',
        endDate: '2024-07-15',
        capacity: '50 campers',
        registrationDeadline: '2024-05-15',
        spotsAvailable: '20',
        highlights: 'Outdoor Adventures, Experienced Staff, Lifelong Memories',
        language: 'English',
        category: 'Outdoor Adventure',
        hostedBy: 'amar',
        campLink: 'http://idtech.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 2,
        campName: 'Tech Innovators Camp',
        address: '456 Silicon Valley, Tech City, USA',
        email: 'contact@techinnovators.com',
        phone: '987-654-3210',
        activitiesOffered: 'Coding@#Robotics@#3D Printing@#Game Design',
        datesAndDurations: 'August 1 - August 14',
        ageGroup: '10-16 years',
        costsAndScholarships:
          'Standard: $800/week, Limited Scholarships Available',
        testimonialsOrReviews:
          'Great learning experience! - Alex K.@#My child built their first robot. - Jamie R.',
        classSchedule:
          'Morning Coding Workshop@#Afternoon Robotics@#Evening Game Design',
        gender: 'Co-ed',
        price: '$800 per week',
        startDate: '2024-08-01',
        endDate: '2024-08-14',
        capacity: '30 campers',
        registrationDeadline: '2024-07-15',
        spotsAvailable: '10',
        highlights:
          'Cutting-edge Technology, Hands-on Projects, Expert Mentors',
        language: 'English',
        category: 'Technology',
        hostedBy: 'deep',
        campLink: 'http://techinnovatorscamp.com',
        imageLink:
          'https://idtech-2018-media-prd.s3.us-west-1.amazonaws.com/header_carousel1_code1_a81f27f83c.jpg',
      },
      {
        id: 3,
        campName: 'Creative Arts Camp',
        address: '789 Art Avenue, Paintsville, USA',
        email: 'info@creativeartscamp.com',
        phone: '654-321-0987',
        activitiesOffered: 'Painting@#Pottery@#Sculpting@#Photography',
        datesAndDurations: 'July 10 - July 20',
        ageGroup: '7-13 years',
        costsAndScholarships: 'Standard: $400/week, Scholarships Available',
        testimonialsOrReviews:
          'A wonderful place for budding artists! - Emily S.@#My child loved the pottery sessions. - Robert T.',
        classSchedule:
          'Morning Sketching@#Afternoon Painting@#Evening Art Showcases',
        gender: 'Co-ed',
        price: '$400 per week',
        startDate: '2024-07-10',
        endDate: '2024-07-20',
        capacity: '40 campers',
        registrationDeadline: '2024-06-25',
        spotsAvailable: '15',
        highlights:
          'Creative Workshops, Professional Mentors, Showcase Opportunities',
        language: 'English',
        category: 'Arts',
        hostedBy: 'susan',
        campLink: 'http://creativeartscamp.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 4,
        campName: 'Sports Mania Camp',
        address: '101 Stadium Blvd, Sportsville, USA',
        email: 'info@sportsmaniamp.com',
        phone: '321-987-6540',
        activitiesOffered: 'Soccer@#Basketball@#Tennis@#Swimming',
        datesAndDurations: 'June 15 - June 30',
        ageGroup: '10-18 years',
        costsAndScholarships: 'Standard: $600/week, Scholarships Available',
        testimonialsOrReviews:
          'Intense and fun! - Mike W.@#Great for young athletes. - Karen P.',
        classSchedule:
          'Morning Drills@#Afternoon Matches@#Evening Strategy Sessions',
        gender: 'Co-ed',
        price: '$600 per week',
        startDate: '2024-06-15',
        endDate: '2024-06-30',
        capacity: '60 campers',
        registrationDeadline: '2024-06-05',
        spotsAvailable: '25',
        highlights:
          'Professional Coaches, Competitive Environment, Team Spirit',
        language: 'English',
        category: 'Sports',
        hostedBy: 'alex',
        campLink: 'http://sportsmaniamp.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 5,
        campName: 'STEM Explorers Camp',
        address: '303 Science Park, Innovate City, USA',
        email: 'contact@stemexplorers.com',
        phone: '456-789-0123',
        activitiesOffered: 'Chemistry@#Physics@#Astronomy@#Robotics',
        datesAndDurations: 'July 20 - August 5',
        ageGroup: '12-18 years',
        costsAndScholarships: 'Standard: $750/week, Scholarships Available',
        testimonialsOrReviews:
          "A perfect mix of learning and fun. - Rachel D.@#My child can't stop talking about the experiments. - Ben K.",
        classSchedule:
          'Morning Experiments@#Afternoon Lectures@#Evening Star Gazing',
        gender: 'Co-ed',
        price: '$750 per week',
        startDate: '2024-07-20',
        endDate: '2024-08-05',
        capacity: '50 campers',
        registrationDeadline: '2024-07-10',
        spotsAvailable: '18',
        highlights:
          'Innovative Learning, Hands-on Experiments, Expert Guidance',
        language: 'English',
        category: 'STEM',
        hostedBy: 'emma',
        campLink: 'http://stemexplorers.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 1,
        campName: 'Adventure Summer Camp',
        address: '123 Forest Lane, Springfield, USA',
        email: 'info@adventuresummercamp.com',
        phone: '123-456-7890',
        activitiesOffered: 'Hiking@#Kayaking@#Archery@#Rock Climbing',
        datesAndDurations: 'June 1 - June 15@#July 1 - July 15',
        ageGroup: '8-14 years',
        costsAndScholarships: 'Standard: $500/week, Scholarships Available',
        testimonialsOrReviews:
          'Best camp ever! - John D.@#My kids loved it. - Sarah L.',
        classSchedule: 'Morning Yoga@#Team Activities@#Evening Campfire',
        gender: 'Co-ed',
        price: '$500 per week',
        startDate: '2024-06-01',
        endDate: '2024-07-15',
        capacity: '50 campers',
        registrationDeadline: '2024-05-15',
        spotsAvailable: '20',
        highlights: 'Outdoor Adventures, Experienced Staff, Lifelong Memories',
        language: 'English',
        category: 'Outdoor Adventure',
        hostedBy: 'amar',
        campLink: 'http://idtech.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 2,
        campName: 'Tech Innovators Camp',
        address: '456 Silicon Valley, Tech City, USA',
        email: 'contact@techinnovators.com',
        phone: '987-654-3210',
        activitiesOffered: 'Coding@#Robotics@#3D Printing@#Game Design',
        datesAndDurations: 'August 1 - August 14',
        ageGroup: '10-16 years',
        costsAndScholarships:
          'Standard: $800/week, Limited Scholarships Available',
        testimonialsOrReviews:
          'Great learning experience! - Alex K.@#My child built their first robot. - Jamie R.',
        classSchedule:
          'Morning Coding Workshop@#Afternoon Robotics@#Evening Game Design',
        gender: 'Co-ed',
        price: '$800 per week',
        startDate: '2024-08-01',
        endDate: '2024-08-14',
        capacity: '30 campers',
        registrationDeadline: '2024-07-15',
        spotsAvailable: '10',
        highlights:
          'Cutting-edge Technology, Hands-on Projects, Expert Mentors',
        language: 'English',
        category: 'Technology',
        hostedBy: 'deep',
        campLink: 'http://techinnovatorscamp.com',
        imageLink:
          'https://idtech-2018-media-prd.s3.us-west-1.amazonaws.com/header_carousel1_code1_a81f27f83c.jpg',
      },
      {
        id: 3,
        campName: 'Creative Arts Camp',
        address: '789 Art Avenue, Paintsville, USA',
        email: 'info@creativeartscamp.com',
        phone: '654-321-0987',
        activitiesOffered: 'Painting@#Pottery@#Sculpting@#Photography',
        datesAndDurations: 'July 10 - July 20',
        ageGroup: '7-13 years',
        costsAndScholarships: 'Standard: $400/week, Scholarships Available',
        testimonialsOrReviews:
          'A wonderful place for budding artists! - Emily S.@#My child loved the pottery sessions. - Robert T.',
        classSchedule:
          'Morning Sketching@#Afternoon Painting@#Evening Art Showcases',
        gender: 'Co-ed',
        price: '$400 per week',
        startDate: '2024-07-10',
        endDate: '2024-07-20',
        capacity: '40 campers',
        registrationDeadline: '2024-06-25',
        spotsAvailable: '15',
        highlights:
          'Creative Workshops, Professional Mentors, Showcase Opportunities',
        language: 'English',
        category: 'Arts',
        hostedBy: 'susan',
        campLink: 'http://creativeartscamp.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 4,
        campName: 'Sports Mania Camp',
        address: '101 Stadium Blvd, Sportsville, USA',
        email: 'info@sportsmaniamp.com',
        phone: '321-987-6540',
        activitiesOffered: 'Soccer@#Basketball@#Tennis@#Swimming',
        datesAndDurations: 'June 15 - June 30',
        ageGroup: '10-18 years',
        costsAndScholarships: 'Standard: $600/week, Scholarships Available',
        testimonialsOrReviews:
          'Intense and fun! - Mike W.@#Great for young athletes. - Karen P.',
        classSchedule:
          'Morning Drills@#Afternoon Matches@#Evening Strategy Sessions',
        gender: 'Co-ed',
        price: '$600 per week',
        startDate: '2024-06-15',
        endDate: '2024-06-30',
        capacity: '60 campers',
        registrationDeadline: '2024-06-05',
        spotsAvailable: '25',
        highlights:
          'Professional Coaches, Competitive Environment, Team Spirit',
        language: 'English',
        category: 'Sports',
        hostedBy: 'alex',
        campLink: 'http://sportsmaniamp.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
      {
        id: 5,
        campName: 'STEM Explorers Camp',
        address: '303 Science Park, Innovate City, USA',
        email: 'contact@stemexplorers.com',
        phone: '456-789-0123',
        activitiesOffered: 'Chemistry@#Physics@#Astronomy@#Robotics',
        datesAndDurations: 'July 20 - August 5',
        ageGroup: '12-18 years',
        costsAndScholarships: 'Standard: $750/week, Scholarships Available',
        testimonialsOrReviews:
          "A perfect mix of learning and fun. - Rachel D.@#My child can't stop talking about the experiments. - Ben K.",
        classSchedule:
          'Morning Experiments@#Afternoon Lectures@#Evening Star Gazing',
        gender: 'Co-ed',
        price: '$750 per week',
        startDate: '2024-07-20',
        endDate: '2024-08-05',
        capacity: '50 campers',
        registrationDeadline: '2024-07-10',
        spotsAvailable: '18',
        highlights:
          'Innovative Learning, Hands-on Experiments, Expert Guidance',
        language: 'English',
        category: 'STEM',
        hostedBy: 'emma',
        campLink: 'http://stemexplorers.com',
        imageLink:
          'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
      },
    ];
  }
  onViewMore() {
    this.router.navigate(['/camps']);
  }
  onCardClick(id: number) {
    this.router.navigate(['camps', id]);
  }
  rediredToAbout(){

    this.router.navigate(['/about']);
  }
  trackByCampId(index: number, camp: any): number {
    return camp.id;
  }
  loadAnimation(){
    gsap.from('.content ',{
      duration:2,
      y:100,
      opacity:0
    })
  }
}
