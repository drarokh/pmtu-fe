import { Component, input } from '@angular/core';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [RouterLink, PokemonTypeComponent],
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();

  trackByType(index: number, type: number) {
    return type;
  }
}
