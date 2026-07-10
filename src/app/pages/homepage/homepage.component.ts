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

  imgMenuPokeball = `images/miscellaneous/bg-pokeball.png`;
  imgMenuPokedex = `url("images/miscellaneous/menu-pokedex.png")`;
  imgMenuGymLeader = `linear-gradient(rgba(128,128,128,0.7), rgba(128,128,128,0.7)), url("images/miscellaneous/menu-gym.png")`;
  imgMenuTeam = `linear-gradient(rgba(128,128,128,0.7), rgba(128,128,128,0.7)), url("images/miscellaneous/menu-team.png")`;
  imgMenuStadium = `linear-gradient(rgba(128,128,128,0.7), rgba(128,128,128,0.7)), url("images/miscellaneous/menu-stadium.png")`;

  openPokedex() {
    this.router.navigate(['/pokedex']);
  }
}
