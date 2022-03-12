import { Injectable } from '@angular/core';
import {IUser} from "./interfaces";
import {LocStorKeys} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  setUsers(): IUser[] {
    return localStorage.getItem(LocStorKeys.USERS) ? JSON.parse(localStorage.getItem(LocStorKeys.USERS)) : [];
  }

  getUsers(): IUser[] {
    return JSON.parse(localStorage.getItem(LocStorKeys.USERS));
  }

  getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem(LocStorKeys.CURRENT_USER_ID));
  }
}
