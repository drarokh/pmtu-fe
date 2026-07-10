import { Component, signal, computed, inject, effect } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [PokemonCardComponent, SearchBarComponent],
  templateUrl: './pokedex.page.html',
  styleUrl: './pokedex.page.scss',
})
export class PokedexPageComponent {
  pokedexService = inject(PokedexService);
  router = inject(Router);

  pokedex = toSignal(this.pokedexService.getPokedex(), { initialValue: [] });

  search = signal('');

  loading = signal(true);

  filtered = computed(() =>
    this.pokedex().filter((p) => p.name.toLowerCase().includes(this.search().toLowerCase())),
  );

  constructor() {
    effect(() => {
      const data = this.pokedex();

      if (data.length > 0) {
        this.loading.set(false);
      }
    });
  }

  goMenu() {
    this.router.navigate(['']);
  }
}
