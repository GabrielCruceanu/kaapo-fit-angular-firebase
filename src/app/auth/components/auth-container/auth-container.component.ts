import {Component, Input} from "@angular/core";
import {AuthType} from "../../../model/auth-interface";

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})

export class AuthContainerComponent {
  @Input() public authImg: AuthType;
  public authType = AuthType;

  constructor() {
    this.authImg = AuthType.Login
  }

}
