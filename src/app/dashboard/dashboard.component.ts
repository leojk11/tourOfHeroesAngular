import { Component, OnInit } from '@angular/core';

// hero interface
import { Hero } from '../hero';

// hero service
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // heroes aray that gets filled in getHeroes function
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // calling the getHeroes function when component is rendered
    this.getHeroes();
  }

  // get heroes function
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }

}
