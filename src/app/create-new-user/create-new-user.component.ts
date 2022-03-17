import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidatorsService} from "../services/custom-validators.service";

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent {

  public form: FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private customValidators: CustomValidatorsService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required,
        Validators.minLength(8),
        this.customValidators.nameCase,
        Validators.pattern('^[a-zA-Z-]*$')
      ]],
      email: ['', [Validators.required,
        this.customValidators.uniqEmail,
        this.customValidators.strictDomain,
        this.customValidators.strictSymbols,
        this.customValidators.strictDots]],
      password: ['', [Validators.required,
        Validators.minLength(5),
        this.customValidators.strictContent]],
    });
  }

  createUser(): void {
    this.auth.signUp(this.form.value.username, this.form.value.email, this.form.value.password);
    this.form.reset();
  }

}
