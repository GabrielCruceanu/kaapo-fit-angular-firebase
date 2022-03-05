import {Component, Input} from "@angular/core";
import {AuthType} from "../../model/AuthResponseData.model";

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})

export class AuthContainerComponent {
  @Input() public authImg: AuthType;
  authType = AuthType;

  constructor() {
    this.authImg = AuthType.Login
  }

}
