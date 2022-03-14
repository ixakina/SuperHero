import { Injectable } from '@angular/core';
import {IUser} from "./interfaces";
import {LocStorKeys} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public setUsers(): IUser[] {
    return localStorage.getItem(LocStorKeys.USERS) ? JSON.parse(localStorage.getItem(LocStorKeys.USERS)) : [];
  }

  public getUsers(): IUser[] {
    return JSON.parse(localStorage.getItem(LocStorKeys.USERS));
  }

  public getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem(LocStorKeys.CURRENT_USER_ID));
  }

  public hasSelectedHeroes(): boolean {
  if (!this.getCurrentUserId()) return false;
    const user: IUser = this.getUsers()
      .find((user: IUser) => user.id === +this.getCurrentUserId());
    return !!(user.selectedHeroesIds && user.selectedHeroesIds.length);
  }

  public getRandomHeroId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
