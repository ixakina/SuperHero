import {Component, OnInit} from '@angular/core';
import {IButtle, IHero, IUser} from "../interfaces";
import {UtilsService} from "../utils.service";
import {HeroesDataService} from "../heroes-data.service";
import {AuthService} from "../auth.service";
import {LocStorKeys} from "../constants";

@Component({
  selector: 'app-buttle',
  templateUrl: './buttle.component.html',
  styleUrls: ['./buttle.component.scss']
})
export class ButtleComponent implements OnInit {
  public hero: IHero;
  public opponent: IHero;
  public isFight: boolean = false;
  public winner: string;
  private buttles: IButtle[];

  constructor(
    private utils: UtilsService,
    private dataService: HeroesDataService,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    const user: IUser = this.utils.getUsers()
      .find((user: IUser) => user.id === +this.utils.getCurrentUserId());
    this.buttles = user.buttles ? user.buttles : [];

    this.setHero(user);
    this.setOpponent();
  }

  public startFight() {
    this.isFight = !this.isFight;

    setTimeout(() => {
      this.isFight = !this.isFight;
      this.winner = +this.hero.powerstats.power > +this.opponent.powerstats.power ?
        this.hero.name : this.opponent.name;
      this.saveButtle();
    }, 5000)
  }

  private setHero(user: IUser): void {
    const heroId = user.selectedHeroesIds[user.selectedHeroesIds.length - 1];
    this.dataService.getById(+heroId)
      .subscribe((hero: IHero) => this.hero = hero);
  }

  private setOpponent(): void {
    let opponentId = this.utils.getRandomHeroId(1, 721);
    this.dataService.getById(opponentId)
      .subscribe((opponent: IHero) => this.opponent = opponent);
  }

  private saveButtle(): void {
    const buttle: IButtle = {
      date: new Date().getTime().toFixed(),
      hero: this.hero.name,
      opponent: this.opponent.name,
      result: this.hero.name === this.winner ? 'win' : 'loss'
    };
    this.buttles.push(buttle);
    this.auth.users = this.auth.users.map((user: IUser) => {
      return user.id === +this.utils.getCurrentUserId() ?
        {...user, buttles: this.buttles} : user
    })
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

}
