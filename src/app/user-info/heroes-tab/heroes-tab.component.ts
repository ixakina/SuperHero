import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Hero, User} from "../../common/interfaces";
import {StorageService} from "../../services/storage.service";
import {HeroesDataService} from "../../services/heroes-data.service";
import {AuthService} from "../../services/auth.service";
import {LocStorKeys} from "../../common/constants";

@Component({
  selector: 'app-heroes-tab',
  templateUrl: './heroes-tab.component.html',
  styleUrls: ['./heroes-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesTabComponent implements OnInit {
  public heroes: Hero[] = [];
  public heroForFight: string;
  public user: User;

  constructor(
    private storage: StorageService,
    private data: HeroesDataService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.drawSelectedHeroes();
    this.setHeroToFight();
  }

  private drawSelectedHeroes() {
    this.user = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID));
    if (this.user.selectedHeroesIds) {
      this.user.selectedHeroesIds.forEach((id: string) => this.data.getById(+id)
        .subscribe((hero: Hero) => {
          this.heroes.push(hero);
          this.cd.markForCheck();
        }));
    }
}

  private setHeroToFight(): void {
    this.heroForFight = this.user.heroToFight ?
      this.user.heroToFight :
      this.user.selectedHeroesIds[this.user.selectedHeroesIds.length - 1];
    this.saveData();
  }

  private saveData(): void {
    this.auth.users = this.auth.users.map((user: User) => user.id === this.user.id ?
      {...user, heroToFight: this.heroForFight} : user);
    this.storage.setData(LocStorKeys.USERS, this.auth.users);
  }

  public deleteHeroFromSelected(id: string): void {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    this.auth.users = this.auth.users.map((user: User) => {
      return user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID) ?
        {
          ...user,
          selectedHeroesIds: user.selectedHeroesIds.filter((heroId: string) => heroId !== id),
          heroToFight: this.heroForFight
        } :
        user
    });
    this.storage.setData(LocStorKeys.USERS, this.auth.users);
  }

  public selectHeroToFight(id: string) {
    this.heroForFight = id;
    this.saveData();
  }
}
