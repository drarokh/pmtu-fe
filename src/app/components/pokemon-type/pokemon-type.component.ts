import { Component, input } from '@angular/core';
import { Type } from '../../models/type.model';

@Component({
  selector: 'app-pokemon-type',
  standalone: true,
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.scss'],
})
export class PokemonTypeComponent {
  type = input<Type>();
}
