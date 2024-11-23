import { Component, inject } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camps',
  standalone: true,
  imports: [
    PaginatorModule,
    ButtonModule,
    DividerModule,
    SliderModule,
    FormsModule,
  ],
  templateUrl: './camps.component.html',
  styleUrl: './camps.component.css',
})
export class CampsComponent {
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
