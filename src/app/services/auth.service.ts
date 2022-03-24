import {Injectable} from '@angular/core';
import {User} from "../common/interfaces";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
import {LocStorKeys} from "../common/constants";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public users: User[] = this.storage.getData(LocStorKeys.USERS) ? <User[]>this.storage.getData(LocStorKeys.USERS) : [];
  public currentUserId: number;

  constructor(private storage: StorageService,
              private router: Router) {
  }

  public signUp(username: string, email: string, password: string): void {
    const user: User = {
      username,
      email,
      password,
      id: this.users.length ? this.users.length + 1 : 1,
      powerups: [
        {uses: 5, name: 'Captain America shield'},
        {uses: 5, name: 'Mjolnir'},
        {uses: 5, name: 'Ironman nano armor'},
        {uses: 5, name: 'Dr. Strange\'s cloak'},
        {uses: 5, name: 'Green lantern\'s ring'},
        {uses: 5, name: 'Flash boots'}
      ]
    };
    this.users.push(user);
    this.storage.setData(LocStorKeys.USERS, this.users);
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
    const token = new Date((new Date().getTime() + 3600 * 1000));
    this.users = this.users.map((user) => user.id === id ? {...user, token} : user);
    this.storage.setData(LocStorKeys.USERS, this.users);
  }

  private setCurrentUserId(id: number): void {
    this.currentUserId = id;
    this.storage.setData(LocStorKeys.CURRENT_USER_ID, this.currentUserId);
  }

  public logout(): void {
    this.users = this.users.map((user) => user.id === this.currentUserId ? {...user, token: ''} : user);
    this.currentUserId = null;
    this.storage.setData(LocStorKeys.USERS, this.users);
    this.storage.setData(LocStorKeys.CURRENT_USER_ID, this.currentUserId);
  }

  public checkAuthorization(): boolean {
    const currentUserId = this.storage.getData(LocStorKeys.CURRENT_USER_ID);
    const loggedInUser = this.users.find((user) => user.id === currentUserId);

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
