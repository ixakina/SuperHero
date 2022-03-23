import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {UtilsService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    public utils: UtilsService,
  ) {
  }

  ngOnInit(): void {
    this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
