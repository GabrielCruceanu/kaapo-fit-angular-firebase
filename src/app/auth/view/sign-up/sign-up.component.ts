import {Component, OnInit} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  authType = AuthType;
  passwordDontMatch: boolean;

  signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor() {
    this.passwordDontMatch = true;
  }
  ngOnInit() {
    // this.checkPasswordMatch(this.signUpFormGroup.controls['password'].value, this.signUpFormGroup.controls['confirmPassword'].value)
  }

  checkPasswordMatch(pass?: string, confirmPass?: string) {
    console.log('pass', pass)
    console.log('confirmPass', confirmPass)
    if (pass && confirmPass) {
      pass === confirmPass ? this.passwordDontMatch = true : this.passwordDontMatch = false;
    } else {
      this.passwordDontMatch = true;
    }

    console.log('passwordDontMatch', this.passwordDontMatch)
  }
  onSubmit() {
    console.log('signUpFormGroup', this.signUpFormGroup)
  this.signUpFormGroup.clearValidators()
  this.signUpFormGroup.markAsUntouched()

  }
}
