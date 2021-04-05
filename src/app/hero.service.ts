import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// hero interface
import { Hero } from './hero';

// mock heroes list
import { HEROES } from './mock-heroes';

// messages service
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messagesService: MessageService) { }

  // get heroes function, that returns mock heroes for now
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);

    // sending message to the message service when the heroes get fetched
    this.messagesService.add('Hero service: fetched heroes');

    return heroes;
  }

  // get single hero, where the given id is equal
  getHero(id: number): Observable<Hero> {
    // get only the hero that has the same ID as the given one
    const hero = HEROES.find(hero => hero.id === id);

    // send message
    this.messagesService.add(`HeroService: fetched hero with id=${id}`);

    // return the chose hero, it needs to be with of because it is an observable
    return of(hero);
  }
}
