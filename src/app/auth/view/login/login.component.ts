import {Component} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  authType = AuthType;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  onSubmit() {
    console.log('loginFormGroup', this.loginFormGroup)
    this.loginFormGroup.reset();
  }
}
