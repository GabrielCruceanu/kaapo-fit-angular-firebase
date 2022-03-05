import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {RouterModule} from "@angular/router";
import {ContainerComponent} from "./container/container.component";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [ButtonComponent, ContainerComponent, LoadingSpinnerComponent],
    exports: [ButtonComponent, ContainerComponent, LoadingSpinnerComponent],
  imports: [CommonModule, RouterModule]
})

export class ComponentsSharedModule {
}
