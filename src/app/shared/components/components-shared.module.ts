import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TabsComponent } from './tabs/tabs.component';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderProfileComponent } from './header-profile/header-profile.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    TabsComponent,
    HeaderProfileComponent,
  ],
  exports: [
    ButtonComponent,
    ContainerComponent,
    LoadingSpinnerComponent,
    TabsComponent,
    HeaderComponent,
    HeaderProfileComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule],
})
export class ComponentsSharedModule {}
