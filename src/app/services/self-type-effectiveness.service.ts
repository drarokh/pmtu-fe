import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable } from 'rxjs';
import { TypeEffectiveness } from '../models/type-effectiveness.model';

@Injectable({
  providedIn: 'root',
})
export class SelfTypeEffectivenessService {
  private http = inject(HttpClient);
  private selfTypeEffectiveness$?: Observable<TypeEffectiveness[]>;

  getSelfMoveEffectiveness(): Observable<TypeEffectiveness[]> {
    return (this.selfTypeEffectiveness$ ??= this.http
      .get<TypeEffectiveness[]>('data/self-type-effectiveness.json')
      .pipe(shareReplay(1)));
  }
}
