import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginComponent} from "./view/login/login.component";
import {SignUpComponent} from "./view/sign-up/sign-up.component";
import {ComponentsSharedModule} from "../components/components-shared.module";
import {AuthContainerComponent} from "./components/auth-container/auth-container.component";


@NgModule({
  declarations: [AuthContainerComponent, LoginComponent, SignUpComponent], imports: [CommonModule, AuthRoutingModule, ComponentsSharedModule]
})
export class AuthModule {
}
