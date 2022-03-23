import {Component, OnInit} from '@angular/core';
import {Hero, User} from "../../common/interfaces";
import {StorageService} from "../../services/storage.service";
import {HeroesDataService} from "../../services/heroes-data.service";
import {AuthService} from "../../services/auth.service";
import {LocStorKeys} from "../../common/constants";

@Component({
  selector: 'app-heroes-tab',
  templateUrl: './heroes-tab.component.html',
  styleUrls: ['./heroes-tab.component.scss']
})
export class HeroesTabComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(
    private storage: StorageService,
    private data: HeroesDataService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.drawSelectedHeroes();
  }

  public deleteHeroFromSelected(id: string): void {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    this.auth.users = this.auth.users.map((user: User) => {
      return user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID) ?
        {
          ...user,
          selectedHeroesIds: user.selectedHeroesIds.filter((heroId: string) => heroId !== id)
        } :
        user
    });
    this.storage.setData(LocStorKeys.USERS, this.auth.users)
  }

  private drawSelectedHeroes() {
    const user: User = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID));
    user.selectedHeroesIds.forEach((id: string) => this.data.getById(+id)
      .subscribe((hero: Hero) => this.heroes.push(hero)))
  }
}
