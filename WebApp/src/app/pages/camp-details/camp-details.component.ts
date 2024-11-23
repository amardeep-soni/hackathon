import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-camp-details',
  standalone: true,
  imports: [],
  templateUrl: './camp-details.component.html',
  styleUrl: './camp-details.component.css',
})
export class CampDetailsComponent {
  id: number = 0;
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    
  }
}
