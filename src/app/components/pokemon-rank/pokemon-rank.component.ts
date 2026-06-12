import { Component, input } from '@angular/core';
import { Rank } from '../../models/rank.model';

@Component({
  selector: 'app-pokemon-rank',
  standalone: true,
  templateUrl: './pokemon-rank.component.html',
  styleUrls: ['./pokemon-rank.component.scss'],
})
export class PokemonRankComponent {
  rank = input<Rank>();
}
