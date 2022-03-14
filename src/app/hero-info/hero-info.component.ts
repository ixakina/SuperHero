import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {IHero} from "../interfaces";
import {switchMap} from "rxjs";
import {HeroesDataService} from "../heroes-data.service";

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit {
  public hero: IHero;

  constructor(
    private route: ActivatedRoute,
    private dataService: HeroesDataService
  ) {
  }

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => this.dataService.getById(params['id']))
    ).subscribe((hero: IHero) => (this.hero = hero))
  }
}