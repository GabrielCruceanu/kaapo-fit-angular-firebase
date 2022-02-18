import {Component} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  public authType = AuthType;

}
