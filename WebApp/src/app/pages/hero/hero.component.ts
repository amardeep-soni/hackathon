import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
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
