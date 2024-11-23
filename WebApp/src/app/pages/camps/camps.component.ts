import { Component, inject, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camp, CampsServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { ServiceProxyModule } from '../../../shared/service-proxies/service-proxy.module';

@Component({
  selector: 'app-camps',
  standalone: true,
  imports: [
    PaginatorModule,
    ButtonModule,
    DividerModule,
    SliderModule,
    FormsModule,
    ServiceProxyModule
  ],
  templateUrl: './camps.component.html',
  styleUrl: './camps.component.css',
})
export class CampsComponent implements OnInit {
  constructor(public _campsService: CampsServiceProxy){}

  // camps: Camp[] = [];
camps=[]
  ngOnInit(): void {
    // this._campsService.getAll().subscribe((data) => {
    //   this.camps = data;
    //   console.log(this.camps)
    // });
    this.camps=[
      {
          "id": 1,
          "campName": "Coding 101 Camp",
          "address": "not available",
          "email": "hello@idtech.com",
          "phone": "1-888-709-8324",
          "activitiesOffered": "Develop games and video sensing projects in Scratch@#Practice coding and game design concepts@#Code with variables, operators, and loops@#Build and test a machine learning model with Google’s Teachable Machine",
          "datesAndDurations": "Weeklong program, 8 hours per day",
          "ageGroup": "8-14 years",
          "costsAndScholarships": "not available",
          "testimonialsOrReviews": "",
          "classSchedule": "",
          "gender": "Both",
          "price": "Starting at $949",
          "startDate": "not available",
          "endDate": "not available",
          "capacity": "not available",
          "registrationDeadline": "not available",
          "spotsAvailable": "not available",
          "highlights": "BattleBots® Camp? You can only get it here. NVIDIA? We’ve got the exclusive. Roblox Camp? We've got that and more in our Summer '25 lineup. Take advantage of the best price you’ll see all year with code BIGSALE to save $200 on can’t-miss courses.\n\nUse code BIGSALE for\n• $200 off camps and academies\n• $100 off virtual camp\n• $50 off private lessons\n\nEnds December 2, 2024 at 11:59pm PT. $200 off applies only to camps and academies. $100 off applies only to virtual camps. $50 off applies only to private lessons. Promo code may be used once per child per program. Promo codes can not be applied to previous purchases or combined with other offers.",
          "language": "English",
          "category": "Tech Camp",
          "hostedBy": "IdTech",
          "campLink": "https://www.idtech.com/courses/storyteller-visual-coding-with-scratch-and-vex-vr",
          "imageLink": "https://idtech-2018-media-prd.s3.us-west-1.amazonaws.com/header_carousel1_code1_a81f27f83c.jpg"
      },
      {
          "id": 2,
          "campName": "BattleBots® Camp Junior",
          "address": "not available",
          "email": "hello@idtech.com",
          "phone": "1-888-709-8324",
          "activitiesOffered": "Build a custom robot with VEX IQ hardware@#Learn how the pros build BattleBots® champions@#Explore mechanical engineering principles@#Compete in a BattleBots®-style tournament",
          "datesAndDurations": "Weeklong program, 8 hours per day",
          "ageGroup": "8-14 years",
          "costsAndScholarships": "not available",
          "testimonialsOrReviews": "",
          "classSchedule": "",
          "gender": "Both",
          "price": "Starting at $1,199",
          "startDate": "not available",
          "endDate": "not available",
          "capacity": "not available",
          "registrationDeadline": "not available",
          "spotsAvailable": "not available",
          "highlights": "BattleBots® Camp? You can only get it here. NVIDIA? We’ve got the exclusive. Roblox Camp? We've got that and more in our Summer '25 lineup. Take advantage of the best price you’ll see all year with code BIGSALE to save $200 on can’t-miss courses.\n\nUse code BIGSALE for\n• $200 off camps and academies\n• $100 off virtual camp\n• $50 off private lessons\n\nEnds December 2, 2024 at 11:59pm PT. $200 off applies only to camps and academies. $100 off applies only to virtual camps. $50 off applies only to private lessons. Promo code may be used once per child per program. Promo codes can not be applied to previous purchases or combined with other offers.",
          "language": "English",
          "category": "Tech Camp",
          "hostedBy": "IdTech",
          "campLink": "https://www.idtech.com/courses/battlebots-camp-junior",
          "imageLink": "https://idtech-2018-media-prd.s3.us-west-1.amazonaws.com/header_carousel1_rob1_e1b25ec4bd.jpg"
      },
      {
          "id": 3,
          "campName": "Game Design with Minecraft",
          "address": "not available",
          "email": "hello@idtech.com",
          "phone": "1-888-709-8324",
          "activitiesOffered": "Design levels and build custom maps@#Build redstone circuits and machines to solve problems@#Use command blocks to enhance the adventure@#Discover game design principles and apply them to Minecraft",
          "datesAndDurations": "Weeklong program, 8 hours per day",
          "ageGroup": "8-14 years",
          "costsAndScholarships": "not available",
          "testimonialsOrReviews": "",
          "classSchedule": "",
          "gender": "Both",
          "price": "Starting at $979",
          "startDate": "not available",
          "endDate": "not available",
          "capacity": "not available",
          "registrationDeadline": "not available",
          "spotsAvailable": "not available",
          "highlights": "BattleBots® Camp? You can only get it here. NVIDIA? We’ve got the exclusive. Roblox Camp? We've got that and more in our Summer '25 lineup. Take advantage of the best price you’ll see all year with code BIGSALE to save $200 on can’t-miss courses.\n\nUse code BIGSALE for\n• $200 off camps and academies\n• $100 off virtual camp\n• $50 off private lessons\n\nEnds December 2, 2024 at 11:59pm PT. $200 off applies only to camps and academies. $100 off applies only to virtual camps. $50 off applies only to private lessons. Promo code may be used once per child per program. Promo codes can not be applied to previous purchases or combined with other offers.",
          "language": "English",
          "category": "Tech Camp",
          "hostedBy": "IdTech",
          "campLink": "https://www.idtech.com/courses/worldbuilder-minecraft-game-design",
          "imageLink": "https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel1_min1_d26f07873f.jpg"
      },
      {
          "id": 4,
          "campName": "Roblox Camp: Launch Your Own Obby Game",
          "address": "not available",
          "email": "hello@idtech.com",
          "phone": "1-888-709-8324",
          "activitiesOffered": "Create and publish games to the Roblox website@#Explore game design fundamentals and build your own obby@#Learn how to create developer products and monetize items@#Implement checkpoints and custom challenges using built-in Lua scripts",
          "datesAndDurations": "Weeklong program, 8 hours per day",
          "ageGroup": "8-14 years",
          "costsAndScholarships": "not available",
          "testimonialsOrReviews": "",
          "classSchedule": "",
          "gender": "Both",
          "price": "Starting at $979",
          "startDate": "not available",
          "endDate": "not available",
          "capacity": "not available",
          "registrationDeadline": "not available",
          "spotsAvailable": "not available",
          "highlights": "BattleBots® Camp? You can only get it here. NVIDIA? We’ve got the exclusive. Roblox Camp? We've got that and more in our Summer '25 lineup. Take advantage of the best price you’ll see all year with code BIGSALE to save $200 on can’t-miss courses.\n\nUse code BIGSALE for\n• $200 off camps and academies\n• $100 off virtual camp\n• $50 off private lessons\n\nEnds December 2, 2024 at 11:59pm PT. $200 off applies only to camps and academies. $100 off applies only to virtual camps. $50 off applies only to private lessons. Promo code may be used once per child per program. Promo codes can not be applied to previous purchases or combined with other offers.",
          "language": "English",
          "category": "Tech Camp",
          "hostedBy": "IdTech",
          "campLink": "https://www.idtech.com/courses/roblox-editor-make-your-own-obby-game",
          "imageLink": "https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel1_rblx1_3b4fed06e2.jpg"
      },
      {
          "id": 5,
          "campName": "Roblox Developer: Imaginative Game Design",
          "address": "not available",
          "email": "hello@idtech.com",
          "phone": "1-888-709-8324",
          "activitiesOffered": "Create and publish games to the Roblox website@#Practice game design fundamentals and storytelling@#Build custom terrain and obstacles for a Roblox game@#Implement game mechanics and custom challenges using Lua scripts@#Monetize your Roblox game and add developer products",
          "datesAndDurations": "Weeklong program, 8 hours per day",
          "ageGroup": "8-14 years",
          "costsAndScholarships": "not available",
          "testimonialsOrReviews": "",
          "classSchedule": "",
          "gender": "Both",
          "price": "Starting at $979",
          "startDate": "not available",
          "endDate": "not available",
          "capacity": "not available",
          "registrationDeadline": "not available",
          "spotsAvailable": "not available",
          "highlights": "BattleBots® Camp? You can only get it here. NVIDIA? We’ve got the exclusive. Roblox Camp? We've got that and more in our Summer '25 lineup. Take advantage of the best price you’ll see all year with code BIGSALE to save $200 on can’t-miss courses.\n\nUse code BIGSALE for\n• $200 off camps and academies\n• $100 off virtual camp\n• $50 off private lessons\n\nEnds December 2, 2024 at 11:59pm PT. $200 off applies only to camps and academies. $100 off applies only to virtual camps. $50 off applies only to private lessons. Promo code may be used once per child per program. Promo codes can not be applied to previous purchases or combined with other offers.",
          "language": "English",
          "category": "Tech Camp",
          "hostedBy": "IdTech",
          "campLink": "https://www.idtech.com/courses/roblox-developer-imaginative-game-design",
          "imageLink": "https://s3.us-west-1.amazonaws.com/idtech-2018-media-prd/header_carousel1_min1_d26f07873f.jpg"
      }
  ]
  
  }
  router= inject(Router)
  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  onCardClick(id:number){
    this.router.navigate(['camps', id])
  }
}
