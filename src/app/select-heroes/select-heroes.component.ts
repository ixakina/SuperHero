import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroesDataService} from "../services/heroes-data.service";
import {IHero, IResponse, IUser} from "../common/interfaces";
import {LocStorKeys} from "../common/constants";
import {UtilsService} from "../services/utils.service";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {debounceTime, filter, Subscription, switchMap, take} from "rxjs";
import {CustomValidatorsService} from "../services/custom-validators.service";


@Component({
  selector: 'app-select-heroes',
  templateUrl: './select-heroes.component.html',
  styleUrls: ['./select-heroes.component.scss']
})
export class SelectHeroesComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = this.fb.control('',
    [this.customValidators.searchInputSpaces, Validators.pattern('^[a-zA-Z]*$')]);
  public heroes: IHero[] = [];
  public searchHistory: string[];
  public selectedHeroesIds: string[];
  public charCode: number = 65;
  public message: string
  private subscription: Subscription;

  constructor(private heroesData: HeroesDataService,
              private auth: AuthService,
              private utils: UtilsService,
              private fb: FormBuilder,
              private customValidators: CustomValidatorsService
  ) {
  }

  ngOnInit(): void {
    const currentUser: IUser = this.utils.getUsers().find((user: IUser) => user.id === +this.utils.getCurrentUserId());
    this.searchHistory = currentUser.searchHistory ? currentUser.searchHistory : [];
    this.selectedHeroesIds = currentUser.selectedHeroesIds ? currentUser.selectedHeroesIds : [];

    this.subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => !Boolean(this.searchControl.errors) && Boolean(this.searchControl.value.trim())),
        switchMap((value: string) => this.heroesData.getByName(value)))
      .subscribe((response: IResponse) => {
        this.message = '';
        if (response.response === 'error') {
          this.message = 'Nothing found, try again...'
        }
        this.heroes = response.results;
        if (this.heroes?.length) this.saveSearchHistory(this.searchControl.value);
      })

    this.heroesData.getByName(String.fromCodePoint(this.charCode))
      .subscribe((response: IResponse) => {
        this.heroes = response.results.filter((hero: IHero) => hero.name[0] === String.fromCodePoint(this.charCode));
      });
  }

  selectHero(id: string) {
    this.selectedHeroesIds.push(id);
    this.auth.users = this.auth.users.map((user: IUser) => user.id === +this.utils.getCurrentUserId() ?
      {...user, selectedHeroesIds: this.selectedHeroesIds} : user);
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public showMoreHeroes(): void {
    if (this.charCode < 90) {
      this.charCode++;
      this.heroesData.getByName(String.fromCodePoint(this.charCode)).pipe(take(1))
        .subscribe((response: IResponse) => {
          const nextPartOfData = response.results.filter((hero: IHero) => hero.name[0] === String.fromCodePoint(this.charCode));
          this.heroes = this.heroes.concat(nextPartOfData);
        });
    }
  }

  private saveSearchHistory(searchRequest: string) {
    if (this.searchHistory.includes(searchRequest)) return;
    this.searchHistory.push(searchRequest);
    this.auth.users = this.auth.users.map((user: IUser) => user.id === +this.utils.getCurrentUserId() ?
      {...user, searchHistory: this.searchHistory} : user);
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }
}
