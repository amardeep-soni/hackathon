import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Camp,
  CampsDto,
  CampsServiceProxy,
} from '../../../shared/service-proxies/service-proxies';
import { gsap } from 'gsap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-camp-details',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './camp-details.component.html',
  styleUrl: './camp-details.component.css',
})
export class CampDetailsComponent {
  loading:boolean = false;
  id: number = 0;
  route = inject(ActivatedRoute);
  constructor(private _campsService: CampsServiceProxy) {}
  camp: CampsDto;
  ngOnInit() {    window.scrollTo(0, 0);
    this.loading=true
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log(this.id);
    this._campsService.getById(this.id).subscribe((data: any) => {
      if(data){
this.loading = false
        this.camp = data;
      }
      console.log(data);
    });
    // this.gsapAnimation();
    // this.camp = new CampsDto({
    //   campName: 'Adventure Summer Camp',
    //   address: '123 Forest Lane, Springfield, USA',
    //   email: 'info@adventuresummercamp.com',
    //   phone: '123-456-7890',
    //   activitiesOffered: ['Hiking', 'Kayaking', 'Archery', 'Rock Climbing'],
    //   datesAndDurations: ['June 1 - June 15', 'July 1 - July 15'],
    //   ageGroup: '8-14 years',
    //   costsAndScholarships: 'Standard: $500/week, Scholarships Available',
    //   testimonialsOrReviews: [
    //     'Best camp ever! - John D.',
    //     'My kids loved it. - Sarah L.',
    //   ],
    //   classSchedule: ['Morning Yoga', 'Team Activities', 'Evening Campfire'],
    //   gender: 'Co-ed', //
    //   price: '$500 per week', //
    //   startDate: '2024-06-01',
    //   endDate: '2024-07-15',
    //   capacity: '50 campers',
    //   registrationDeadline: '2024-05-15',
    //   spotsAvailable: '20',
    //   highlights: 'Outdoor Adventures, Experienced Staff, Lifelong Memories',
    //   language: 'English',
    //   category: 'Outdoor Adventure',
    //   campLink: 'http://idtech.com',
    //   imageLink:
    //     'https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel2_rblx2_b_31b275ed2d.jpg',
    //   hostedBy: 'amar',
    // });
  }
  gsapAnimation() {
    gsap.from('.contactInfo', { duration: 1.5, x: 200, opacity: 0 });
  }
}
