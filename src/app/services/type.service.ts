import { inject, Injectable } from '@angular/core';
import { Type } from '../models/type.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonTypeService {
  private http = inject(HttpClient);
  private types$?: Observable<Type[]>;

  getTypes(): Observable<Type[]> {
    return (this.types$ ??= this.http
      .get<Type[]>('data/types.json')
      .pipe(shareReplay(1)));
  }
}
