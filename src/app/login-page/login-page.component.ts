import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  public form: FormGroup;
  public message: string = '';

    constructor(
      private formBuilder: FormBuilder,
      private auth: AuthService,
      private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = "Your current session has expired. Please login\n" +
          "again to continue using this app!";
      }
    })

      this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  submit() {
    this.auth.login(this.form.value.email, this.form.value.password);
    this.form.reset();
   }


}
