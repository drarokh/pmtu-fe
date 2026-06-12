import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable } from 'rxjs';
import { Effect } from '../models/effect.model';

@Injectable({
  providedIn: 'root',
})
export class EffectService {
  private http = inject(HttpClient);
  private effects$?: Observable<Effect[]>;

  getEffects(): Observable<Effect[]> {
    return (this.effects$ ??= this.http
      .get<Effect[]>('data/effects.json')
      .pipe(shareReplay(1)));
  }
}
