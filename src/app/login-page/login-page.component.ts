import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CustomValidatorsService} from "../services/custom-validators.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private customValidators: CustomValidatorsService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = "Your current session has expired. Please login\n" +
          "again to continue using this app!";
      }
    })

    this.form = this.formBuilder.group({
      email: ['', [Validators.required,
        this.customValidators.strictDomain,
        this.customValidators.strictSymbols,
        this.customValidators.strictDots]],
      password: ['', [Validators.required, Validators.minLength(5), this.customValidators.strictContent]]
    });

  }

  submit(): void {
    this.auth.login(this.form.value.email, this.form.value.password);
    this.form.reset();
  }


}
