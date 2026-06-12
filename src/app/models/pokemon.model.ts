import { Ability } from './ability.model';
import { Move } from './move.model';
import { Rank } from './rank.model';
import { Type } from './type.model';

export interface Pokemon {
  id: number;
  number: string;
  name: string;
  types: Type[];
  level: number;
  catch: number;
  rank: Rank;
  abilities: Ability[];
  moves: Move[];
}
