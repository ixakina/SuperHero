import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroesDataService} from "../services/heroes-data.service";
import {Hero, Response, User} from "../common/interfaces";
import {LocStorKeys} from "../common/constants";
import {StorageService} from "../services/storage.service";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {debounceTime, filter, Subject, switchMap, takeUntil} from "rxjs";
import {searchInputSpacesValidator} from "../common/utils";


@Component({
  selector: 'app-select-heroes',
  templateUrl: './select-heroes.component.html',
  styleUrls: ['./select-heroes.component.scss']
})
export class SelectHeroesComponent implements OnInit, OnDestroy {
  public searchControl: FormControl;
  public heroes: Hero[] = [];
  public searchHistory: string[];
  public selectedHeroesIds: string[];
  public charCode: number = 65;
  public message: string
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private heroesData: HeroesDataService,
              private auth: AuthService,
              private storage: StorageService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getInitialHeroesList();
    this.initSearchControl();
    this.setVariablesValues();
    this.handleInputChanges();
  }

  private getInitialHeroesList(): void {
    this.heroesData.getByName(String.fromCodePoint(this.charCode))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Response) => {
        this.heroes = response.results.filter((hero: Hero) => hero.name[0] === String.fromCodePoint(this.charCode));
      });
  }

  private initSearchControl(): void {
    this.searchControl = this.fb.control('',
      [searchInputSpacesValidator, Validators.pattern('^[a-zA-Z]*$')]);
  }

  private setVariablesValues() {
    const currentUser: User = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID));
    this.searchHistory = currentUser.searchHistory ? currentUser.searchHistory : [];
    this.selectedHeroesIds = currentUser.selectedHeroesIds ? currentUser.selectedHeroesIds : [];
  }

  private handleInputChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => !Boolean(this.searchControl.errors) && Boolean(this.searchControl.value.trim())),
        switchMap((value: string) => this.heroesData.getByName(value)),
        takeUntil(this.destroy$))
      .subscribe((response: Response) => {
        this.message = '';
        if (response.response === 'error') {
          this.message = 'Nothing found, try again...'
        }
        this.heroes = response.results;
        if (this.heroes?.length) this.saveSearchHistory(this.searchControl.value);
      })
  }

  public selectHero(id: string) {
    this.selectedHeroesIds.push(id);
    this.auth.users = this.auth.users.map((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID) ?
      {...user, selectedHeroesIds: this.selectedHeroesIds} : user);
    this.storage.setData(LocStorKeys.USERS, this.auth.users)
  }

  public showMoreHeroes(): void {
    if (this.charCode < 90) {
      this.charCode++;
      this.heroesData.getByName(String.fromCodePoint(this.charCode))
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: Response) => {
          const nextPartOfData = response.results.filter((hero: Hero) => hero.name[0] === String.fromCodePoint(this.charCode));
          this.heroes = this.heroes.concat(nextPartOfData);
        });
    }
  }

  private saveSearchHistory(searchRequest: string) {
    if (this.searchHistory.includes(searchRequest)) return;
    this.searchHistory.push(searchRequest);
    this.auth.users = this.auth.users.map((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID) ?
      {...user, searchHistory: this.searchHistory} : user);
    this.storage.setData(LocStorKeys.USERS, this.auth.users)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
