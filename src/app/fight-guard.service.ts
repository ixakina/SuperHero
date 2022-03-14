import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class FightGuardService implements  CanActivate{

  constructor(private utils: UtilsService) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.utils.hasSelectedHeroes();
  }
}
