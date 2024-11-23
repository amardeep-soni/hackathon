import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component'; 
import { CampsComponent } from './pages/camps/camps.component';
import { CampDetailsComponent } from './pages/camp-details/camp-details.component';

export const routes: Routes = [
    {
        path:'', 
        component:HeroComponent
    },
    {
        path:'camps',
        component:CampsComponent
    },
    {
        path:'camps/:id',
        component:CampDetailsComponent
    }
];
