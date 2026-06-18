import { Component, input } from '@angular/core';
import { Move } from '../../models/move.model';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { Effect } from '../../models/effect.model';
import { Type } from '../../models/type.model';
import { PokemonMoveDetailComponent } from '../pokemon-move-detail/pokemon-move-detail.component';

@Component({
  selector: 'app-pokemon-move',
  standalone: true,
  templateUrl: './pokemon-move.component.html',
  styleUrls: ['./pokemon-move.component.scss'],
  imports: [PokemonTypeComponent, PokemonMoveDetailComponent],
})
export class PokemonMoveComponent {
  move = input<Move>();
  pkmType1 = input<Type>();
  pkmType2 = input<Type>();
  moveInfoOpen = false;

  trackByEffect(index: number, effect: Effect) {
    return effect.name;
  }

  toogleMoveInfo() {
    this.moveInfoOpen = !this.moveInfoOpen;
  }
}
