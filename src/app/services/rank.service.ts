import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, Observable } from 'rxjs';
import { Rank } from '../models/rank.model';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  private http = inject(HttpClient);
  private ranks$?: Observable<Rank[]>;

  getRanks(): Observable<Rank[]> {
    return (this.ranks$ ??= this.http.get<Rank[]>('data/ranks.json').pipe(shareReplay(1)));
  }
}
