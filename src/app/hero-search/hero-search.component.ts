import { Component, OnInit } from '@angular/core';

// rxjs
import { Observable, of, Subject } from 'rxjs';
// rxjs operators
import { 
  debounceTime, 
  distinctUntilChanged, 
  switchMap } from 'rxjs/operators';

// hero interface
import { Hero } from '../hero';

// hero service
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  // searched heroes array
  heroes$: Observable<Hero[]>;
  // search terms
  private serachTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // pushing new search term into the observable stream
  search(term: string): void {
    this.serachTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.serachTerms.pipe(
      // waits 300ms after each keystroke berfore cosidering as term
      debounceTime(300),

      // ignores new term if it is the same as the previos one
      distinctUntilChanged(),

      // switch to new search obsevanle each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

}
