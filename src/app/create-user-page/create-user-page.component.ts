import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom-validators";

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent {

  public form: FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,) {
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

  }


  createUser() {
    this.auth.signUp(this.form.value.username, this.form.value.email, this.form.value.password);
    this.form.reset();
  }

}
