import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LandingPageComponent} from "./view/landing-page.component";
import {LandingPageRoutingModule} from "./landing-page-routing.module";
import {LpNavigationComponent} from "./components/lp-navigation/lp-navigation.component";
import {MatIconModule} from "@angular/material/icon";
import {LpHeroComponent} from "./components/lg-hero/lp-hero.component";
import {ComponentsSharedModule} from "../components/components-shared.module";

@NgModule({
  declarations: [LandingPageComponent, LpNavigationComponent, LpHeroComponent],
  imports: [CommonModule, LandingPageRoutingModule, MatIconModule, ComponentsSharedModule]
})

export class LandingPageModule {
}
