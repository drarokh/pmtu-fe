import { Component, input } from '@angular/core';
import { Move } from '../../models/move.model';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { Effect } from '../../models/effect.model';
import { Type } from '../../models/type.model';
import { PokemonMoveDetailComponent } from '../pokemon-move-detail/pokemon-move-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-move',
  standalone: true,
  templateUrl: './pokemon-move.component.html',
  styleUrls: ['./pokemon-move.component.scss'],
  imports: [PokemonTypeComponent, PokemonMoveDetailComponent, CommonModule],
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

  hexToRgba(hex: string | undefined, alpha: number): string {
    if (hex == undefined) return '';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
