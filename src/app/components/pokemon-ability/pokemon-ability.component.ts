import { Component, input } from '@angular/core';
import { Ability } from '../../models/ability.model';

@Component({
  selector: 'app-pokemon-ability',
  standalone: true,
  templateUrl: './pokemon-ability.component.html',
  styleUrls: ['./pokemon-ability.component.scss'],
})
export class PokemonAbilityComponent {
  ability = input<Ability>();
}
