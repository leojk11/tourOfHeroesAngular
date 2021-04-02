import { Component, OnInit } from '@angular/core';

// hero interface
import { Hero } from '../hero';

// hero service
import { HeroService } from '../hero.service';

// messages service
import { MessageService } from '../message.service';

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

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // call the getHeroes function 
    this.getHeroes();
  }

  // setting the selected hero
  onSelect(hero: Hero) {
    // setting the selected hero
    this.selectedHero = hero;

    // adding message when hero is clicked
    this.messageService.add(`Heroes component: Selected hero id=${hero.id}`);
  }

  // get heroes from hero service
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // used subscribe because the getHeroes function now returns an obsevable
  }

}
