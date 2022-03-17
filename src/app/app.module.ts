import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {CreateNewUserComponent} from "./create-new-user/create-new-user.component";
import {SelectHeroesComponent} from './select-heroes/select-heroes.component';
import {AlphabetComponent} from './alphabet/alphabet.component';
import {UserInfoComponent} from "./user-info/user-info.component";
import {HeroesTabComponent} from "./user-info/heroes-tab/heroes-tab.component";
import {HeroInfoComponent} from './hero-info/hero-info.component';
import {ButtlesHistoryTabComponent} from './user-info/buttles-history-tab/buttles-history-tab.component';
import {ButtleComponent} from './buttle/buttle.component';
import {PowerupsTabComponent} from './user-info/powerups-tab/powerups-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateNewUserComponent,
    SelectHeroesComponent,
    AlphabetComponent,
    UserInfoComponent,
    HeroesTabComponent,
    HeroInfoComponent,
    ButtlesHistoryTabComponent,
    ButtleComponent,
    PowerupsTabComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
