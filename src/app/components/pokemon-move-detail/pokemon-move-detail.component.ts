import { Component, input } from '@angular/core';
import { Move } from '../../models/move.model';
import { Type } from '../../models/type.model';
import { Effect } from '../../models/effect.model';
import { PokemonTypeRoundComponent } from '../pokemon-type-round/pokemon-type-round.component';

@Component({
  selector: 'app-pokemon-move-detail',
  standalone: true,
  templateUrl: './pokemon-move-detail.component.html',
  styleUrls: ['./pokemon-move-detail.component.scss'],
  imports: [PokemonTypeRoundComponent],
})
export class PokemonMoveDetailComponent {
  move = input<Move>();

  hexToRgba(hex: string | undefined, alpha: number): string {
    if (hex == undefined) return '';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  trackByType(index: number, type: Type) {
    return type.name;
  }

  trackByEffect(index: number, effect: Effect) {
    return effect.name;
  }
}
