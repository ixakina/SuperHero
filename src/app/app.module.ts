import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {CreateUserPageComponent} from "./create-user-page/create-user-page.component";
import { SelectHeroesComponent } from './select-heroes/select-heroes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateUserPageComponent,
    SelectHeroesComponent
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
export class AppModule { }
