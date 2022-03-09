import { Injectable } from '@angular/core';
import {IUser} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  randomToken() {
    return (Math.random()*100000).toFixed(0)
  }

  users(): IUser[] {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  }
}
