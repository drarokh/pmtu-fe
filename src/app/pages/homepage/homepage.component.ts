import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router) {}

  openPokedex() {
    this.router.navigate(['/pokedex']);
  }
}
