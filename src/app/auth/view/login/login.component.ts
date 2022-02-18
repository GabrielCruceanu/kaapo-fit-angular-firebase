import {Component} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public authType = AuthType;
}
