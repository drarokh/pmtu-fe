import { Component, input } from '@angular/core';
import { Move } from '../../models/move.model';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { Effect } from '../../models/effect.model';
import { Type } from '../../models/type.model';

@Component({
  selector: 'app-pokemon-move',
  standalone: true,
  templateUrl: './pokemon-move.component.html',
  styleUrls: ['./pokemon-move.component.scss'],
  imports: [PokemonTypeComponent],
})
export class PokemonMoveComponent {
  move = input<Move>();
  pkmType1 = input<Type>();
  pkmType2 = input<Type>();

  trackByEffect(index: number, effect: Effect) {
    return effect.name;
  }
}
