import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../common/custom-validators";

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent {

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
