import { Component, OnInit } from '@angular/core';

// hero interface
import { Hero } from '../hero';

// heroes mock list
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // list of heroes
  heroes = HEROES;

  // selected hero for showing hero detail
  selectedHero?: Hero; // on the start of the application there is no hero selected
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
