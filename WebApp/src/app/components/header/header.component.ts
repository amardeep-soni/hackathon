import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDarkMode = false;
  isMenuOpen = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    body.classList.toggle('dark-mode', this.isDarkMode);
    body.classList.toggle('light-mode', !this.isDarkMode);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
