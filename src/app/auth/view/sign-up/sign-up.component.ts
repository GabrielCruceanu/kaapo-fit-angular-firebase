import {Component, OnInit, Optional} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-sign-up', templateUrl: './sign-up.component.html', styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  authType = AuthType;
  passwordDontMatch: boolean;

  signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(@Optional() private auth: Auth) {
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

  onSubmit(form: FormGroup) {
    const {email, password} = form.value;
    console.log('signUpFormGroup', this.signUpFormGroup)
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('User logat', user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error with code', errorCode, 'and message:', errorMessage)
      });
    this.signUpFormGroup.reset({
      email: '', password: ''
    })
    this.signUpFormGroup.clearValidators()
    this.signUpFormGroup.markAsUntouched()
  }
}
