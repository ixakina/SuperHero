import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {CreateNewUserComponent} from "./create-new-user/create-new-user.component";
import {SelectHeroesComponent} from "./select-heroes/select-heroes.component";
import {AuthGuardService} from "./auth-guard.service";
import {UserInfoComponent} from "./user-info/user-info.component";
import {HeroInfoComponent} from "./hero-info/hero-info.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'sign-up', component: CreateNewUserComponent},
  {path: 'select-heroes', component: SelectHeroesComponent, canActivate: [AuthGuardService]},
  {path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuardService]},
  {path: 'hero/:id', component: HeroInfoComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
