import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { CatalogService } from './catalog.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonDto } from '../dto/pokemon.dto';
import { mapPokemon } from '../mappers/map-pokemon.mapper';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  private http = inject(HttpClient);
  private catalog = inject(CatalogService);
  private pokedex$?: Observable<Pokemon[]>;

  getPokedex(): Observable<Pokemon[]> {
    if (!this.pokedex$) {
      const pokemon$ = this.http.get<PokemonDto[]>('data/pokedex.json');

      this.pokedex$ = combineLatest([
        pokemon$,
        this.catalog.getTypeMap(),
        this.catalog.getAbilityMap(),
        this.catalog.getMovesMap(),
        this.catalog.getRankMap(),
      ]).pipe(
        map(([pokemonList, typeMap, abilityMap, moveMap, rankMap]) =>
          pokemonList.map((p) => mapPokemon(p, typeMap, abilityMap, moveMap, rankMap)),
        ),
        shareReplay(1),
      );
    }
    return this.pokedex$;
  }

  getPokemonById(id: number): Observable<Pokemon | undefined> {
    return this.getPokedex().pipe(map((list) => list.find((p) => p.id === id)));
  }
}
