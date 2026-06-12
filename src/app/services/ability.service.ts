import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable } from 'rxjs';
import { Ability } from '../models/ability.model';

@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  private http = inject(HttpClient);
  private abilities$?: Observable<Ability[]>;

  getAbilities(): Observable<Ability[]> {
    return (this.abilities$ ??= this.http
      .get<Ability[]>('data/abilities.json')
      .pipe(shareReplay(1)));
  }
}
