import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Hero, User} from "../common/interfaces";
import {Subscription, switchMap} from "rxjs";
import {HeroesDataService} from "../services/heroes-data.service";
import {StorageService} from "../services/storage.service";
import {LocStorKeys} from "../common/constants";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit, OnDestroy {
  public hero: Hero;
  public selectedHeroesIds: string[];
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: HeroesDataService,
    private storage: StorageService,
    private auth: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.loadHeroInfo();
    this.initVariablesvalues();

  }

  private loadHeroInfo(): void {
    this.subscription = this.route.params.pipe(
      switchMap((params: Params) => this.dataService.getById(params['id']))
    ).subscribe((hero: Hero) => (this.hero = hero));
  }

  public initVariablesvalues(): void {
    this.selectedHeroesIds = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID))
      .selectedHeroesIds;
  }

  public selectHero(): void {
    this.selectedHeroesIds.push(this.hero.id);
    this.auth.users = this.auth.users.map((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID) ?
      {...user, selectedHeroesIds: this.selectedHeroesIds} : user);
    this.storage.setData(LocStorKeys.USERS, this.auth.users);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
