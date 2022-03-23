import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {User} from "../common/interfaces";
import {LocStorKeys} from "../common/constants";

@Injectable({
  providedIn: 'root'
})
export class FightGuardService implements CanActivate {

  constructor(private storage: StorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasSelectedHeroes();
  }

  private hasSelectedHeroes(): boolean {
    const currentUserId = this.storage.getData(LocStorKeys.CURRENT_USER_ID);
    if (!currentUserId) return false;
    const user: User = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === currentUserId);
    return !!(user.selectedHeroesIds && user.selectedHeroesIds.length);
  }
}
