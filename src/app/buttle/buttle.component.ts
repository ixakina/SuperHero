import {Component, OnInit} from '@angular/core';
import {IButtle, IHero, IPowerUp, IUser} from "../common/interfaces";
import {UtilsService} from "../services/utils.service";
import {HeroesDataService} from "../services/heroes-data.service";
import {AuthService} from "../services/auth.service";
import {LocStorKeys} from "../common/constants";
import {take, timer} from "rxjs";

@Component({
  selector: 'app-buttle',
  templateUrl: './buttle.component.html',
  styleUrls: ['./buttle.component.scss']
})
export class ButtleComponent implements OnInit {
  public hero: IHero;
  public opponent: IHero;
  public powerups: [string, IPowerUp][];
  public isFight: boolean = false;
  public winner: string;
  public selectedPowerups: string[] = [];
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

    this.powerups = Object.entries(user.powerups);
    this.buttles = user.buttles ? user.buttles : [];

    this.setHero(user);
    this.setOpponent();
  }

  public startFight(): void {
    this.isFight = !this.isFight;

    timer(5000).pipe(take(1)).subscribe(() => {
      this.isFight = !this.isFight;
      this.winner = this.getWinner();
      this.updateUserData();
      this.selectedPowerups = [];
    })
  }

  public selectPowerup(powerup: string): void {
    this.selectedPowerups.includes(powerup) ?
      this.selectedPowerups = this.selectedPowerups.filter(item => item !== powerup) :
      this.selectedPowerups.push(powerup);
    console.log(this.selectedPowerups)
  }

  private getWinner(): string {
    const powerups: number = this.selectedPowerups.length ? this.selectedPowerups.length * 10 : 0;
    const heroPowerups: number = Object.values(this.hero.powerstats)
      .filter((powerup: string) => powerup !== 'null')
      .reduce((acc: number, item: string): number => (acc + Number(item)), 0) + powerups;
    const opponentPowerups: number = Object.values(this.opponent.powerstats)
      .filter((powerup: string) => powerup !== 'null')
      .reduce((acc: number, item: string): number => (acc + Number(item)), 0);

    return heroPowerups > opponentPowerups ? this.hero.name : this.opponent.name
  }

  private setHero(user: IUser): void {
    const heroId = user.selectedHeroesIds[user.selectedHeroesIds.length - 1];
    this.dataService.getById(+heroId)
      .subscribe((hero: IHero) => this.hero = hero);
  }

  private setOpponent(): void {
    let opponentId = this.utils.getRandomHeroId(1, 721);
    this.dataService.getById(opponentId)
      .subscribe((opponent: IHero) => {
          if (Object.values(opponent?.powerstats).every((stat: string) => stat === 'null')) this.setOpponent();
          this.opponent = opponent;
        }
      );
  }

  private updateUserData(): void {
    const powerupsAfterFight = this.getUpdatedPowerups();
    this.saveButtle();

    this.auth.users = this.auth.users.map((user: IUser) => {
      return user.id === +this.utils.getCurrentUserId() ?
        {...user, buttles: this.buttles, powerups: powerupsAfterFight} : user
    })
    localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.auth.users));
  }

  private saveButtle(): void {
    const buttle: IButtle = {
      date: new Date().getTime().toFixed(),
      hero: this.hero.name,
      opponent: this.opponent.name,
      result: this.hero.name === this.winner ? 'win' : 'loss'
    };
    this.buttles.push(buttle);
  }

  private updateUses(powerup: IPowerUp) {
    return this.selectedPowerups.includes(powerup.name) ? powerup.uses - 1 : powerup.uses;
  }

  private getUpdatedPowerups(): any {
    const user: IUser = this.utils.getUsers()
      .find((user: IUser) => user.id === +this.utils.getCurrentUserId());

    const updatePowerups = {
      shield: {
        uses: this.updateUses(user.powerups.shield),
        imgSrc: '../../../assets/captain_america.png',
        name: 'Captain America shield'
      },
      mjolnir: {
        uses: this.updateUses(user.powerups.mjolnir),
        imgSrc: '../../../assets/Mjolnir.webp',
        name: 'Mjolnir'
      },
      armor: {
        uses: this.updateUses(user.powerups.armor),
        imgSrc: './../../assets/iron.png',
        name: 'Ironman nano armor'
      },
      cloak: {
        uses: this.updateUses(user.powerups.cloak),
        imgSrc: '../../../assets/cloak.png',
        name: 'Dr. Strange\'s cloak'
      },
      ring: {
        uses: this.updateUses(user.powerups.ring),
        imgSrc: '../../../assets/green.webp',
        name: 'Green lantern\'s ring'
      },
      boots: {
        uses: this.updateUses(user.powerups.boots),
        imgSrc: '../../../assets/flash.webp',
        name: 'Flash boots'
      }
    }

    this.powerups = Object.entries(updatePowerups);
    return updatePowerups;
  }

}
