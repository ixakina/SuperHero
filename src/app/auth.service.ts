import { Injectable } from '@angular/core';
import {IUser} from "./interfaces";
import {UtilsService} from "./utils.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users: IUser[] = this.utils.users();
  public currentUserId: number;

  constructor(private utils: UtilsService,
              private router: Router) {}

  public signUp(username: string, email: string, password: string): void {
      const user: IUser = {
      username, email, password,
      id: this.users.length ? this.users.length + 1 : 1,
    };

      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.router.navigate(['/']);
  }

  public login(email: string, password: string): void {
    const loggedInUser = this.users.find(user => user.email === email && user.password === password);
    if (!loggedInUser) alert('You are not registered, please sign up');

    const expirationDate = new Date((new Date().getTime() + 60*1000));
    const token = this.utils.randomToken();

    // this.users = this.users.map((user) => user === loggedInUser ?
    //   {...user, token: token, expDate: expirationDate} : user);

    this.currentUserId = loggedInUser.id;

    // localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expDate', JSON.stringify(expirationDate));

    this.router.navigate(['/select-heroes']);
  }

  public isAuthentificated(): boolean {
    return localStorage.getItem()
  }

  public logout() {

  }

  // public checkToken() {
  //   if (!this.currentUserId) return;
  //
  //   const currentUser = this.users.find(user => user.id === this.currentUserId);
  //   if (currentUser.expDate > new Date() && currentUser.token) this.router.navigate(['/select-heroes']);
  //
  //   this.users = this.users.map((user) =>
  //     user.id === this.currentUserId ? {...user, token: '', expDate: null} : user);
  //   this.currentUserId = null;
  //   localStorage.setItem('users', JSON.stringify(this.users));
  //   localStorage.setItem('currentUserId', JSON.stringify(this.currentUserId));
  //  }
}
