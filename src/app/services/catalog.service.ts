import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, switchMap, Observable } from 'rxjs';
import { TypeDto } from '../dto/type.dto';
import { Type } from '../models/type.model';
import { Ability } from '../models/ability.model';
import { Move } from '../models/move.model';
import { Effect } from '../models/effect.model';
import { AbilityDto } from '../dto/ability.dto';
import { MoveDto } from '../dto/move.dto';
import { EffectDto } from '../dto/effect.model';
import { Rank } from '../models/rank.model';
import { RankDto } from '../dto/rank.dto';
import { TypeEffectiveness } from '../models/type-effectiveness.model';
import { TypeEffectivenessDto } from '../dto/type-effectiveness.dto';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);

  private types$?: Observable<Record<number, Type>>;
  private abilities$?: Observable<Record<number, Ability>>;
  private moves$?: Observable<Record<number, Move>>;
  private effects$?: Observable<Record<number, Effect>>;
  private ranks$?: Observable<Record<number, Rank>>;
  private moveEffectiveness$?: Observable<Record<number, TypeEffectiveness>>;

  getTypeMap(): Observable<Record<number, Type>> {
    return (this.types$ ??= this.http.get<TypeDto[]>('data/types.json').pipe(
      map((list) => Object.fromEntries(list.map((t) => [t.id, t] as const))),
      shareReplay(1),
    ));
  }

  getAbilityMap(): Observable<Record<number, Ability>> {
    return (this.abilities$ ??= this.http.get<AbilityDto[]>('data/abilities.json').pipe(
      map((list) => Object.fromEntries(list.map((t) => [t.id, t] as const))),
      shareReplay(1),
    ));
  }

  getMovesMap(): Observable<Record<number, Move>> {
    return (this.moves$ ??= this.http.get<MoveDto[]>('data/moves.json').pipe(
      switchMap((list) =>
        this.getEffectMap().pipe(
          switchMap((effects) =>
            this.getMoveEffectiveness().pipe(
              switchMap((moveEffectiveness) =>
                this.getTypeMap().pipe(
                  map(
                    (types) =>
                      Object.fromEntries(
                        list.map(
                          (moveDto) => [moveDto.id, this.toMove(moveDto, types, effects, moveEffectiveness)] as const,
                        ),
                      ) as Record<number, Move>,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      shareReplay(1),
    ));
  }

  getEffectMap(): Observable<Record<number, Effect>> {
    return (this.effects$ ??= this.http.get<EffectDto[]>('data/effects.json').pipe(
      map((list) => Object.fromEntries(list.map((t) => [t.id, t] as const))),
      shareReplay(1),
    ));
  }

  getRankMap(): Observable<Record<number, Rank>> {
    return (this.ranks$ ??= this.http.get<RankDto[]>('data/ranks.json').pipe(
      map((list) => Object.fromEntries(list.map((t) => [t.id, t] as const))),
      shareReplay(1),
    ));
  }

  getMoveEffectiveness(): Observable<Record<number, TypeEffectiveness>> {
    return (this.moveEffectiveness$ ??= this.http.get<TypeEffectivenessDto[]>('data/type-effectiveness.json').pipe(
      map((list) => Object.fromEntries(list.map((t) => [t.id, t] as const))),
      shareReplay(1),
    ));
  }

  private toMove(
    moveDto: MoveDto,
    types: Record<number, Type>,
    effects: Record<number, Effect>,
    moveEffectiveness: Record<number, TypeEffectiveness>,
  ): Move {
    const typeId = Number(moveDto.type);
    return {
      ...moveDto,
      type: types[typeId]!,
      effects: moveDto.effects.map((effectId) => effects[Number(effectId)]!),
      type_strong: (moveEffectiveness[typeId]?.strong ?? []).map((id) => types[id]!),
      type_resist: (moveEffectiveness[typeId]?.resist ?? []).map((id) => types[id]!),
      type_immune: (moveEffectiveness[typeId]?.immune ?? []).map((id) => types[id]!),
    };
  }
}
