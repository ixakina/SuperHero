import {Component, OnInit} from '@angular/core';
import {HeroesDataService} from "../heroes-data.service";
import {IHero, IResponse, IUser} from "../interfaces";
import {LocStorKeys} from "../constants";
import {UtilsService} from "../utils.service";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-select-heroes',
  templateUrl: './select-heroes.component.html',
  styleUrls: ['./select-heroes.component.scss']
})
export class SelectHeroesComponent implements OnInit {
  public heroes: IHero[] = [];
  public searchValue: string = 'a';
  public searchHistory: string[];
  public selectedHeroesIds: string[];

  constructor(private heroesData: HeroesDataService,
              private auth: AuthService,
              private utils: UtilsService) {}

  ngOnInit(): void {
    const currentUser: IUser = this.utils.getUsers().find((user: IUser) => user.id === +this.utils.getCurrentUserId());

    this.searchHistory = currentUser.searchHistory ? currentUser.searchHistory : [];

    this.selectedHeroesIds = currentUser.selectedHeroesIds ? currentUser.selectedHeroesIds : [];

    this.heroesData.getByName(this.searchValue).subscribe((response: IResponse) => {
      this.heroes = response.results;
    });
   }

  public onSearchStart() {
    if (!this.searchValue) return;
    this.heroesData.getByName(this.searchValue).subscribe((response: IResponse) => {
      this.heroes = response.results;
      if (this.heroes.length) this.saveSearchHistory(this.searchValue);
    })
  }

  private saveSearchHistory(searchRequest: string) {
    if (this.searchHistory.includes(searchRequest)) return;
    this.searchHistory.push(searchRequest);
    this.auth.users = this.auth.users.map((user: IUser) => user.id === +this.utils.getCurrentUserId() ?
      {...user, searchHistory: this.searchHistory} : user);
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

  selectHero(id: string) {
    this.selectedHeroesIds.push(id);
    this.auth.users = this.auth.users.map((user: IUser) => user.id === +this.utils.getCurrentUserId() ?
      {...user, selectedHeroesIds: this.selectedHeroesIds} : user);
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }
}
