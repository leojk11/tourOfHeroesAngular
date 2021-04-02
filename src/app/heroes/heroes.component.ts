import { Component, OnInit } from '@angular/core';

// hero interface
import { Hero } from '../hero';

// hero service
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // list of heroes
  heroes: Hero[] = [];

  // selected hero for showing hero detail
  selectedHero?: Hero; // on the start of the application there is no hero selected
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // call the getHeroes function 
    this.getHeroes();
  }

  // get heroes from hero service
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // used subscribe because the getHeroes function now returns an obsevable
  }

}
