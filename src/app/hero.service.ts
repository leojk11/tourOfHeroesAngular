import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';

// hero interface
import { Hero } from './hero';

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

  // http options that AOI expects
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
    // url to send http request to
    const url = `${this.heroesUrl}/${id}`;

    // http request to get single hero by ID
    return this.http.get<Hero>(url)
      .pipe(
        // send message to know which hero has been fetched
        tap(_ => this.log(`Fetched hero ID=${id}`)),
        // error handling
        catchError(this.handleError<Hero>(`getHero ID=${id}`))
      )
  }

  // get request, search heroes by name
  searchHeroes(term: string): Observable<Hero[]> {
    // if nothing is sent as term, just return an empty array
    if(!term.trim()) {
      return of([]);
    }

    const url = `${this.heroesUrl}/?name=${term}`;

    return this.http.get<Hero[]>(url)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes found matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
  }

  // put request, update single hero function
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        // send message that secific hero got updated
        tap(_ => this.log(`Update hero id=${hero.id}`)),
        // error handling
        catchError(this.handleError<any>('updateHero'))
      )
  }

  // post request, adding new hero to the server
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        // send message when new hero has been added
        tap((newHero: Hero) => this.log(`added hero w/ ID=${newHero.id}`)),
        // error handling
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  // delete request, delete hero by id
  deleteHero(id: number): Observable<Hero> {
    // url to send request to
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        // send message that hero has been deleted
        tap(_ => this.log(`deleted hero ID=${id}`)),
        // error handler
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }
}
