import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from './components/header/header.component';

import { register } from 'swiper/element/bundle';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
// register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    FooterComponent,
    CardModule,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'WebApp';
  isScrolled: boolean = false;
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  // Listen to the window scroll event
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show the scroll-to-top button if the user scrolls down more than 100px
    this.isScrolled = window.scrollY > 100;
  }
}
