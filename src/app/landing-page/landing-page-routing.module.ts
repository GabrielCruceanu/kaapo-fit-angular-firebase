import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./view/landing-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{path: '', component: LandingPageComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})

export class LandingPageRoutingModule {

}
