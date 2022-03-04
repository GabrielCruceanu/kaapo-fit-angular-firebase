import {Component} from "@angular/core";
import {BtnType} from "../../../core/model/button-interface";

@Component({
  selector: 'app-lp-hero',
  templateUrl: './lp-hero.component.html',
  styleUrls: ['./lp-hero.component.scss']
})

export class LpHeroComponent {
  public btnType = BtnType;
}
