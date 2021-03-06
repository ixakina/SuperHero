import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Battle, Hero, PowerUp, User} from "../common/interfaces";
import {StorageService} from "../services/storage.service";
import {HeroesDataService} from "../services/heroes-data.service";
import {AuthService} from "../services/auth.service";
import {LocStorKeys} from "../common/constants";
import {Subject, takeUntil, timer} from "rxjs";
import {getRandomHeroId} from "../common/utils";

@Component({
  selector: 'app-buttle',
  templateUrl: './buttle.component.html',
  styleUrls: ['./buttle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtleComponent implements OnInit, OnDestroy {
  public hero: Hero;
  public opponent: Hero;
  public powerups: PowerUp[];
  public isFight: boolean = false;
  public winner: string;
  public selectedPowerups: string[] = [];
  private buttles: Battle[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private storage: StorageService,
    private dataService: HeroesDataService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    const user: User = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID));

    this.setVariablesValues(user);
    this.setHero(user);
    this.setOpponent();
  }

  private setVariablesValues(user: User): void {
    this.powerups = user.powerups;
    this.buttles = user.battles ? user.battles : [];
  }

  public startFight(): void {
    this.isFight = !this.isFight;

    timer(5000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isFight = !this.isFight;
      this.winner = this.getWinner();
      document.body.style.overflow = 'hidden';
      this.updateUserData();
      this.selectedPowerups = [];
      this.cd.markForCheck();
    })
  }

  public selectPowerup(powerup: string): void {
    this.selectedPowerups.includes(powerup) ?
      this.selectedPowerups = this.selectedPowerups.filter(item => item !== powerup) :
      this.selectedPowerups.push(powerup);
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

  private setHero(user: User): void {
    const heroId = user.heroToFight || user.selectedHeroesIds[user.selectedHeroesIds.length - 1];
    this.dataService.getById(+heroId).pipe(takeUntil(this.destroy$))
      .subscribe((hero: Hero) => {
        this.hero = hero;
        this.cd.markForCheck();
      });
  }

  private setOpponent(): void {
    let opponentId = getRandomHeroId(1, 721);
    this.dataService.getById(opponentId).pipe(takeUntil(this.destroy$))
      .subscribe((opponent: Hero) => {
          if (Object.values(opponent?.powerstats).every((stat: string) => stat === 'null')) this.setOpponent();
          this.opponent = opponent;
          this.cd.markForCheck();
        }
      );
  }

  private updateUserData(): void {
    this.saveButtle();
    this.updatePowerups();

    this.auth.users = this.auth.users.map((user: User) => {
      return user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID) ?
        {...user, battles: this.buttles, powerups: this.powerups} : user
    })
    this.storage.setData(LocStorKeys.USERS, this.auth.users)
  }

  private saveButtle(): void {
    const battle: Battle = {
      date: new Date().getTime().toFixed(),
      hero: this.hero.name,
      opponent: this.opponent.name,
      result: this.hero.name === this.winner ? 'win' : 'loss'
    };
    this.buttles.push(battle);
  }

  public closeModal(): void {
    this.winner = '';
    document.body.style.overflow = 'auto';
  }

  private updateUses(powerup: PowerUp) {
    return this.selectedPowerups.includes(powerup.name) ? powerup.uses - 1 : powerup.uses;
  }

  private updatePowerups(): void {
    this.powerups = this.powerups.map((powerup: PowerUp) => ({...powerup, uses: this.updateUses(powerup)}));
  }

  public trackPowerup(index: number, powerup: PowerUp) {
    return powerup.name;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
