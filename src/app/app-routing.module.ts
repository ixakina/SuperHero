import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {CreateUserPageComponent} from "./create-user-page/create-user-page.component";
import {SelectHeroesComponent} from "./select-heroes/select-heroes.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'sign-up', component: CreateUserPageComponent},
  {path: 'select-heroes', component: SelectHeroesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
