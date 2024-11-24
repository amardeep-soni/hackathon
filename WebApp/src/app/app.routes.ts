import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { CampsComponent } from './pages/camps/camps.component';
import { CampDetailsComponent } from './pages/camp-details/camp-details.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HeroComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'camps',
    component: CampsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'camps/:id',
    component: CampDetailsComponent,
  },
];
