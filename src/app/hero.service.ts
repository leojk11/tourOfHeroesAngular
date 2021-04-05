import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// hero interface
import { Hero } from './hero';

// mock heroes list
import { HEROES } from './mock-heroes';

// messages service
import { MessageService } from './message.service';

// http symbols
import { HttpClient, HttpHeaders } from '@angular/common/http';

// error handling
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messagesService: MessageService,
    private http: HttpClient
  ) { }
  
  // heores url to send api requests to
  private heroesUrl = 'api/heroes';

  // custom function that sends message
  private log(message: string) {
    this.messagesService.add(`HeroService: ${message}`);
  }

  // function that handles operations that have failed and lets the app continue
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // log error to the console
      console.log(error);

      // log the error as a message from message service
      this.log(`${operation} failed: ${error.message}`);

      // if there is an error let the app continue with an empty array
      return of(result as T);
    }
  }


  // get heroes function, that returns mock heroes for now
  getHeroes(): Observable<Hero[]> {
    // return heroes that had been sent throught the heroesUrl
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // set message that heroes had been fetched
        tap(_ => this.log('fetched heroes')),
        // catch an error if it exists
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  // get single hero, where the given id is equal
  getHero(id: number): Observable<Hero> {
    // get only the hero that has the same ID as the given one
    const hero = HEROES.find(hero => hero.id === id);

    // send message
    this.log(`fetched hero with ID=${id}`);

    // return the chose hero, it needs to be with of because it is an observable
    return of(hero);
  }
}
