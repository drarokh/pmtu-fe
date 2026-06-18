import { Effect } from './effect.model';
import { Type } from './type.model';

export interface Move {
  id: number;
  name: string;
  value: string;
  type: Type;
  dice: string;
  has_stab: boolean;
  stab: string;
  effects: Effect[];
  type_strong: Type[];
  type_resist: Type[];
  type_immune: Type[];
}
