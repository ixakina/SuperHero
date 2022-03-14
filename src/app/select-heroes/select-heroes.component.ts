import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroesDataService} from "../heroes-data.service";
import {IHero, IResponse, IUser} from "../interfaces";
import {LocStorKeys} from "../constants";
import {UtilsService} from "../utils.service";
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {debounceTime, Subscription, switchMap} from "rxjs";


@Component({
  selector: 'app-select-heroes',
  templateUrl: './select-heroes.component.html',
  styleUrls: ['./select-heroes.component.scss']
})
export class SelectHeroesComponent implements OnInit, OnDestroy{
  public searchControl: FormControl = this.fb.control('');
  public heroes: IHero[] = [];
  public searchValue: string = 'a';
  public searchHistory: string[];
  public selectedHeroesIds: string[];
  private subscription: Subscription;

  constructor(private heroesData: HeroesDataService,
              private auth: AuthService,
              private utils: UtilsService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const currentUser: IUser = this.utils.getUsers().find((user: IUser) => user.id === +this.utils.getCurrentUserId());
    this.searchHistory = currentUser.searchHistory ? currentUser.searchHistory : [];
    this.selectedHeroesIds = currentUser.selectedHeroesIds ? currentUser.selectedHeroesIds : [];

    this.subscription = this.searchControl.valueChanges
      .pipe(debounceTime(500),
        switchMap((value: string) => this.heroesData.getByName(value))
      ).subscribe((response: IResponse) => {
      this.heroes = response.results;
      if (this.heroes.length) this.saveSearchHistory(this.searchControl.value);
    })


    this.heroesData.getByName('a').subscribe((response: IResponse) => {
      this.heroes = response.results;
    });
  }

  selectHero(id: string) {
    this.selectedHeroesIds.push(id);
    this.auth.users = this.auth.users.map((user: IUser) => user.id === +this.utils.getCurrentUserId() ?
      {...user, selectedHeroesIds: this.selectedHeroesIds} : user);
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

  private saveSearchHistory(searchRequest: string) {
    if (this.searchHistory.includes(searchRequest)) return;
    this.searchHistory.push(searchRequest);
    this.auth.users = this.auth.users.map((user: IUser) => user.id === +this.utils.getCurrentUserId() ?
      {...user, searchHistory: this.searchHistory} : user);
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
