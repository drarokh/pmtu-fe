import { Component, input } from '@angular/core';
import { Type } from '../../models/type.model';

@Component({
  selector: 'app-pokemon-type-round',
  standalone: true,
  templateUrl: './pokemon-type-round.component.html',
  styleUrls: ['./pokemon-type-round.component.scss'],
})
export class PokemonTypeRoundComponent {
  type = input<Type>();
}
