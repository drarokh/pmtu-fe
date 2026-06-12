import { Routes } from '@angular/router';
import { PokedexPageComponent } from './pages/pokedex/pokedex.page';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: PokedexPageComponent
    },
    {
        path: 'pokedex/:id',
        component: PokemonDetailComponent
    }
];
