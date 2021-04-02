import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// hero interface
import { Hero } from './hero';

// mock heroes list
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // get heroes function, that returns mock heroes for now
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
