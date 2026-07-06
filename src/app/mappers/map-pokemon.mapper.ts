import { PokemonDto } from '../dto/pokemon.dto';
import { Ability } from '../models/ability.model';
import { Move } from '../models/move.model';
import { Pokemon } from '../models/pokemon.model';
import { Rank } from '../models/rank.model';
import { Type } from '../models/type.model';

export function mapPokemon(
  dto: PokemonDto,
  typeMap: Record<number, Type>,
  abilityMap: Record<number, Ability>,
  moveMap: Record<number, Move>,
  rankMap: Record<number, Rank>,
): Pokemon {
  return {
    id: dto.id,
    number: dto.number,
    name: dto.name,
    level: dto.level,
    catch: dto.catch,
    rank: rankMap[dto.rank],
    evolveExp: dto.evolveExp,
    evolveLevel: dto.evolveExp != null ? Number(dto.evolveExp) + Number(dto.level) : 0,
    types: dto.types.map((id) => typeMap[id]).filter(Boolean),
    abilities: dto.abilities.map((id) => abilityMap[id]).filter(Boolean),
    moves: dto.moves.map((id) => moveMap[id]).filter(Boolean),
  };
}
