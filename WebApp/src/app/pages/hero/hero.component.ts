import { Component, inject,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css', 
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroComponent {
  router=inject(Router)
  onViewMore(){
    this.router.navigate(['/camps'])
  }
  onCardClick(id:number){
    this.router.navigate(['camps', id])
  }
}
