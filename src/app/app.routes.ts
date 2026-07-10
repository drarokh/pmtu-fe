import { Routes } from '@angular/router';
import { PokedexPageComponent } from './pages/pokedex/pokedex.page';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { HomePageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'pokedex',
        component: PokedexPageComponent
    },
    {
        path: 'pokedex/:id',
        component: PokemonDetailComponent
    }
];
