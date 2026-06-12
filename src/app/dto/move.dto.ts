export interface MoveDto {
  id: number;
  name: string;
  value: string;
  type: number;
  dice: string;
  has_stab: boolean;
  stab: string;
  effects: number[];
}
