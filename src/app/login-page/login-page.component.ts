import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {
  strictContentValidator,
  strictDomainValidator,
  strictDotsValidator,
  strictSymbolsValidator
} from "../common/utils";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public message: string = '';
  private paramsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.checkQueryParams();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  submit(): void {
    this.auth.login(this.form.value.email, this.form.value.password);
    this.form.reset();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,
        strictDomainValidator,
        strictSymbolsValidator,
        strictDotsValidator]],
      password: ['', [Validators.required, Validators.minLength(5), strictContentValidator]]
    });
  }

  private checkQueryParams() {
    this.paramsSubscription = this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = `Your current session has expired. Please login
          again to continue using this app!`;
      }
    })
  }
}
