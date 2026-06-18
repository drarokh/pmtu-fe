import { Component, signal, computed, inject } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [PokemonCardComponent, SearchBarComponent],
  templateUrl: './pokedex.page.html',
  styleUrl: './pokedex.page.scss',
})
export class PokedexPageComponent {
  pokedexService = inject(PokedexService);
  pokedex = toSignal(this.pokedexService.getPokedex(), { initialValue: [] });
  search = signal('');

  filtered = computed(() =>
    this.pokedex().filter((p) => p.name.toLowerCase().includes(this.search().toLowerCase())),
);
}
