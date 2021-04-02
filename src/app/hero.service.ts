import { Injectable } from '@angular/core';

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
  getHeroes(): Hero[] {
    return HEROES;
  }
}
