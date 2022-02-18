import {Component, Input} from "@angular/core";
import {BtnType} from "../../model/button-interface";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() public path: string;
  @Input() public btnType: BtnType;

  constructor() {
    this.path = '';
    this.btnType = BtnType.Primary;
  }
}
