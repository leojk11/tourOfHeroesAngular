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
}
