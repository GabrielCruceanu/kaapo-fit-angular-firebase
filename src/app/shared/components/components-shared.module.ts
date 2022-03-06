import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {RouterModule} from "@angular/router";
import {ContainerComponent} from "./container/container.component";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from "@angular/material/icon";
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [ButtonComponent, ContainerComponent, LoadingSpinnerComponent, HeaderComponent, TabsComponent],
    exports: [ButtonComponent, ContainerComponent, LoadingSpinnerComponent, TabsComponent],
    imports: [CommonModule, RouterModule, MatIconModule]
})

export class ComponentsSharedModule {
}
