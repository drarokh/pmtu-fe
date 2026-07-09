import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTypeComponent } from '../../components/pokemon-type/pokemon-type.component';
import { PokedexService } from '../../services/pokedex.service';
import { Pokemon } from '../../models/pokemon.model';
import { Type } from '../../models/type.model';
import { Move } from '../../models/move.model';
import { Effect } from '../../models/effect.model';
import { PokemonAbilityComponent } from '../../components/pokemon-ability/pokemon-ability.component';
import { PokemonRankComponent } from '../../components/pokemon-rank/pokemon-rank.component';
import { PokemonMoveComponent } from '../../components/pokemon-move/pokemon-move.component';
import { forkJoin, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { TypeEffectiveness } from '../../models/type-effectiveness.model';
import { SelfTypeEffectivenessService } from '../../services/self-type-effectiveness.service';
import { PokemonTypeService } from '../../services/type.service';
import { PokemonTypeRoundComponent } from '../../components/pokemon-type-round/pokemon-type-round.component';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [
    PokemonAbilityComponent,
    PokemonRankComponent,
    PokemonMoveComponent,
    PokemonTypeRoundComponent,
    PokemonTypeComponent,
    PokemonCardComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  // URL Parameter
  pokemonId!: number;

  // Tabs
  tabs = ['About', 'Moves', 'Evolutions'];
  activeTab = 'About';

  // Services
  pokedexService = inject(PokedexService);
  selfTypeEffectivenessService = inject(SelfTypeEffectivenessService);
  typeService = inject(PokemonTypeService);

  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Variables
  pokemon: Pokemon | undefined;
  mainType: Type | undefined;
  typeArray: Type[] = [];
  // Effectiveness
  weakness: Type[] = [];
  doubleWeakness: Type[] = [];
  resistence: Type[] = [];
  doubleResistence: Type[] = [];
  immunities: Type[] = [];
  effectivenessArray: number[] = new Array(18).fill(0);
  evolutionPokemons = signal<Map<number, Pokemon>>(new Map());

  constructor() {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const pokemonId = Number(params.get('id'));
      this.loadData(pokemonId);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(id: number) {
    this.weakness = [];
    this.doubleWeakness = [];
    this.resistence = [];
    this.doubleResistence = [];
    this.immunities = [];
    this.effectivenessArray = new Array(18).fill(0);
    forkJoin({
      pokemon: this.pokedexService.getPokemonById(id).pipe(takeUntil(this.destroy$)),
      types: this.typeService.getTypes(),
      selfTypeEffectiveness: this.selfTypeEffectivenessService.getSelfMoveEffectiveness(),
    }).subscribe(({ pokemon, types, selfTypeEffectiveness }) => {
      this.pokemon = pokemon;
      this.elaboratePkmEffectiveness(selfTypeEffectiveness, pokemon, types);
      this.pokemon?.evo.forEach(id => {
        this.loadEvolution(id);
      });
      this.cdr.markForCheck();
    });
  }

  loadEvolution(id: number) {
    this.pokedexService.getPokemonById(id)
      .subscribe(pokemon => {
        if (pokemon != undefined){
          this.evolutionPokemons.update(map => {
            const newMap = new Map(map);
            newMap.set(id, pokemon);
            return newMap;
          });
        }
      });
  }

  elaboratePkmEffectiveness(
    selfTypeMap: TypeEffectiveness[],
    pokemon: Pokemon | undefined,
    types: Type[],
  ) {
    pokemon?.types.forEach((currPkmType) => {
      // Strong
      selfTypeMap[currPkmType.id - 1].strong.forEach((currStrong) => {
        this.effectivenessArray[currStrong - 1] += 2;
      });
      // Resist
      selfTypeMap[currPkmType.id - 1].resist.forEach((currResist) => {
        this.effectivenessArray[currResist - 1] -= 2;
      });
      // Immunities
      selfTypeMap[currPkmType.id - 1].immune.forEach((currImmune) => {
        this.effectivenessArray[currImmune - 1] = -10;
      });
    });
    this.effectivenessArray.forEach((currType, index) => {
      if (currType < -4) {
        this.immunities.push(types[index]);
      } else if (currType == -4) {
        this.doubleResistence.push(types[index]);
      } else if (currType == -2) {
        this.resistence.push(types[index]);
      } else if (currType == 2) {
        this.weakness.push(types[index]);
      } else if (currType > 2) {
        this.doubleWeakness.push(types[index]);
      }
    });
  }

  get imageSrc(): string | null {
    return this.pokemon?.number ? `images/pkm-res/${this.pokemon.number}.png` : null;
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

  trackByEvo(index: number, evo: number) {
    return evo;
  }
}
