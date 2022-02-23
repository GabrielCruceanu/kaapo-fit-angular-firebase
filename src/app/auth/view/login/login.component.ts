import {Component, OnInit, Optional} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Auth, authState, signInWithEmailAndPassword, User} from "@angular/fire/auth";
import {EMPTY, map, Observable, Subscription} from "rxjs";
import {traceUntilFirst} from "@angular/fire/performance";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  authType = AuthType;
  public user: Observable<User | null | undefined>;
  showLoginButton = false;
  showLogoutButton = false;
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  private userDisposable: Subscription | undefined;

  constructor(@Optional() private auth: Auth) {
    this.user = EMPTY
  }

  ngOnInit() {
    if (this.auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }

    console.log('this.user', this.user)
  }

  onSubmit(form: FormGroup) {
    console.log('form', form)
    const {email, password} = form.value;
    console.log('email', email)
    console.log('password', password)

    signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user
      console.log('User logat', user)
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error with code', errorCode, 'and message:', errorMessage)
      });

    this.loginFormGroup.reset({
      email: '', password: ''
    })
    this.loginFormGroup.clearValidators()
    this.loginFormGroup.markAsUntouched()
  }
}
