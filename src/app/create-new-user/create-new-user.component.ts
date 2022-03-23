import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  matchedValuesValidator,
  nameCaseValidator, strictContentValidator,
  strictDomainValidator,
  strictDotsValidator,
  strictSymbolsValidator,
  uniqEmailValidator
} from "../common/utils";

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent {

  public form: FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public createUser(): void {
    this.auth.signUp(this.form.value.username, this.form.value.email, this.form.value.password);
    this.form.reset();
  }

  private initForm(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[a-zA-Z-]*$'),
          nameCaseValidator
        ]],
        email: ['', [Validators.required,
          Validators.email,
          uniqEmailValidator,
          strictDomainValidator,
          strictSymbolsValidator,
          strictDotsValidator]],
        password: ['', [Validators.required,
          Validators.minLength(5),
          strictContentValidator]],
      },
      {validators: matchedValuesValidator}
    );
  }
}
