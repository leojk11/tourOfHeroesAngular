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

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    // call the getHeroes function 
    this.getHeroes();
  }

  // get heroes from hero service
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // used subscribe because the getHeroes function now returns an obsevable
  }

  // add new hero
  add(name: string): void {
    name = name.trim();

    // if the sent name is blank just return
    if(!name) { return };

    // send add hero http request
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }

  // delete hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);

    this.heroService.deleteHero(hero.id).subscribe();
  }

}
