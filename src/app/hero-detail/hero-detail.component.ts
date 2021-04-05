import { Component, OnInit, Input } from '@angular/core';

// hero interface
import { Hero } from '../hero';

// hero service
import { HeroService } from '../hero.service';

// route
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  // get single hero function
  getHero(): void {
    // getting the id from the url params
    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  
  // go back function
  goBack(): void {
    this.location.back();
  }

  // edit/update single hero
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack())
  }
}
