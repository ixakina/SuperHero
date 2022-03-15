import { Injectable } from '@angular/core';
import {IUser} from "../common/interfaces";
import {UtilsService} from "./utils.service";
import {Router} from "@angular/router";
import {LocStorKeys} from "../common/constants";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public users: IUser[] = this.utils.setUsers();
  public currentUserId: number;

  constructor (private utils: UtilsService,
              private router: Router) {}

  public signUp(username: string, email: string, password: string): void {
      const user: IUser = {
      username, email, password,
      id: this.users.length ? this.users.length + 1 : 1,
    };
      this.users.push(user);
      localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.users));
      this.router.navigate(['/']);
  }

  public login(email: string, password: string): void {
    const loggedInUser = this.users.find(user => user.email === email && user.password === password);
    if (!loggedInUser) {
      alert('You are not registered, please sign up');
      return;
    }
    this.setToken(loggedInUser.id);
    this.setCurrentUserId(loggedInUser.id);
    this.router.navigate(['/select-heroes']);
  }

  public setToken(id: number) {
      const token = new Date((new Date().getTime() + 3600*1000));
      this.users = this.users.map((user) => user.id === id ? {...user, token} : user);
      localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.users));
  }

  public setCurrentUserId(id: number): void {
    this.currentUserId = id;
    localStorage.setItem(LocStorKeys.CURRENT_USER_ID, JSON.stringify(this.currentUserId));
  }

  public logout() {
      this.users = this.users.map((user) => user.id === this.currentUserId ? {...user, token: ''} : user);
      this.currentUserId = null;
      localStorage.setItem(LocStorKeys.USERS, JSON.stringify(this.users));
      localStorage.setItem(LocStorKeys.CURRENT_USER_ID, JSON.stringify(this.currentUserId));
  }

  isAuthenticated(): boolean {
    const currentUserId = localStorage.getItem(LocStorKeys.CURRENT_USER_ID);
    const loggedInUser = this.users.find((user) => user.id === +currentUserId);

    if (!currentUserId || !loggedInUser) {
      this.router.navigate(['/']);
      return false;
    }
    if (new Date(loggedInUser.token) < new Date()) {
      this.logout();
      this.router.navigate(['/'], {
        queryParams: {
          loginAgain: true,
        }
      });
      return false;
    }
    return true;
  }

}
