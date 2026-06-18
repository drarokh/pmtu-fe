import { Component, input } from '@angular/core';
import { Move } from '../../models/move.model';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { Type } from '../../models/type.model';

@Component({
  selector: 'app-pokemon-move-detail',
  standalone: true,
  templateUrl: './pokemon-move-detail.component.html',
  styleUrls: ['./pokemon-move-detail.component.scss'],
  imports: [PokemonTypeComponent],
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
}
