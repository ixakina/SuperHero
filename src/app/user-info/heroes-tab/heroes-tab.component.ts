import {Component, OnInit} from '@angular/core';
import {IHero, IUser} from "../../common/interfaces";
import {UtilsService} from "../../services/utils.service";
import {HeroesDataService} from "../../services/heroes-data.service";
import {AuthService} from "../../services/auth.service";
import {LocStorKeys} from "../../common/constants";

@Component({
  selector: 'app-heroes-tab',
  templateUrl: './heroes-tab.component.html',
  styleUrls: ['./heroes-tab.component.scss']
})
export class HeroesTabComponent implements OnInit {
  public heroes: IHero[] = [];

  constructor(
    private utils: UtilsService,
    private data: HeroesDataService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.drawSelectedHeroes();
  }

 public deleteHeroFromSelected(id: string): void {
    this.heroes = this.heroes.filter(hero => hero.id !== id);

    this.auth.users = this.auth.users.map((user: IUser) => {
    return user.id === +this.utils.getCurrentUserId() ?
      {...user,
        selectedHeroesIds: user.selectedHeroesIds.filter((heroId:string) => heroId !== id)} :
      user
    });
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

  private drawSelectedHeroes(): void {
    const user = this.utils.getUsers().find((user: IUser) => user.id === +this.utils.getCurrentUserId());
    user.selectedHeroesIds.forEach((id:string) => this.data.getById(+id)
      .subscribe((hero: IHero) => this.heroes.push(hero)))
  }
}
