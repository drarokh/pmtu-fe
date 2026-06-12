import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTypeComponent } from '../../components/pokemon-type/pokemon-type.component';
import { PokedexService } from '../../services/pokedex.service';
import { Pokemon } from '../../models/pokemon.model';
import { Type } from '../../models/type.model';
import { Move } from '../../models/move.model';
import { Effect } from '../../models/effect.model';
import { PokemonAbilityComponent } from '../../components/pokemon-ability/pokemon-ability.component';
import { PokemonRankComponent } from '../../components/pokemon-rank/pokemon-rank.component';
import { PokemonMoveComponent } from "../../components/pokemon-move/pokemon-move.component";

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [PokemonTypeComponent, PokemonAbilityComponent, PokemonRankComponent, PokemonMoveComponent],
})
export class PokemonDetailComponent {
  // URL Parameter
  pokemonId!: number;

  // Tabs
  tabs = ['About', 'Moves', 'Evolution'];
  activeTab = 'About';

  // Services
  pokedexService = inject(PokedexService);

  // Variables
  pokemon: Pokemon | undefined;
  mainType: Type | undefined;
  levelWidth: number = 0;
  catchWidth: number = 0;
  MAX_WILD_LEVEL = 7;
  MAX_CATCH_LEVEL = 8;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const pokemonId = Number(params.get('id'));
      this.loadData(pokemonId);
    });
  }

  loadData(id: number) {
    this.pokedexService.getPokemonById(id).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.levelWidth = this.pokemon ? (this.pokemon.level / this.MAX_WILD_LEVEL) * 100 : 0;
      this.catchWidth = this.pokemon ? (this.pokemon.catch / this.MAX_CATCH_LEVEL) * 100 : 0;
    });
  }

  goBack() {
    this.router.navigate(['']);
  }

  goBefore(id: number | undefined) {
    if (id === undefined || id == 1) return;

    this.router.navigate(['/pokedex', id - 1]);
  }

  goAfter(id: number | undefined) {
    if (id === undefined || id == 251) return;
    this.router.navigate(['/pokedex', id + 1]);
  }

  // trackBy functions for ngFor-like templates to avoid re-creation
  trackByType(index: number, type: number) {
    return type;
  }

  trackByTab(index: number, tab: string) {
    return tab;
  }

  trackByAbility(index: number, ability: number) {
    return ability;
  }

  trackByMove(index: number, move: Move) {
    return move.id;
  }

  trackByEffect(index: number, effect: Effect) {
    return effect.name;
  }
}
