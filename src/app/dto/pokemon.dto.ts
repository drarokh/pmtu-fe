export interface PokemonDto {
  id: number;
  number: string;
  name: string;
  types: number[];
  level: number;
  catch: number;
  rank: number;
  evolveExp: number;
  abilities: number[];
  moves: number[];
}
