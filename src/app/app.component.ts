import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "./services/storage.service";
import {hasSelectedHeroes} from "./common/utils";
import {LocStorKeys} from "./common/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    public storage: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.auth.checkAuthorization();
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  public hasSelectedHeroes(): boolean {
    return hasSelectedHeroes();
  }

  public hasCurrentUser() {
    return !!this.storage.getData(LocStorKeys.CURRENT_USER_ID);
  }
}
