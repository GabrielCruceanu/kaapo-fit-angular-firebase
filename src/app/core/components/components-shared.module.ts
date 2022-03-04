import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {RouterModule} from "@angular/router";
import {ContainerComponent} from "./container/container.component";

@NgModule({
  declarations: [ButtonComponent, ContainerComponent],
  exports: [ButtonComponent, ContainerComponent],
  imports: [CommonModule, RouterModule]
})

export class ComponentsSharedModule {
}
