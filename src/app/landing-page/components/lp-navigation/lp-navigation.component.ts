import {Component} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {KAAPO_FIT_LOGO} from "../../../../content/icons";

@Component({
  selector: 'app-lp-navigation',
  templateUrl: 'lp-navigation.component.html',
  styleUrls: ['./lp-navigation.component.scss']
})
export class LpNavigationComponent {
  constructor(private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIconLiteral('kaapo-fit-logo', this.domSanitizer.bypassSecurityTrustHtml(KAAPO_FIT_LOGO))
  }
}
