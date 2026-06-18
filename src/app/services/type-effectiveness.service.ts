import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable } from 'rxjs';
import { TypeEffectiveness } from '../models/type-effectiveness.model';

@Injectable({
  providedIn: 'root',
})
export class TypeEffectivenessService {
  private http = inject(HttpClient);
  private typeEffectiveness$?: Observable<TypeEffectiveness[]>;

  getMoveEffectiveness(): Observable<TypeEffectiveness[]> {
    return (this.typeEffectiveness$ ??= this.http
      .get<TypeEffectiveness[]>('data/type-effectiveness.json')
      .pipe(shareReplay(1)));
  }
}
