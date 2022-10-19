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
import { UploadImageService } from '@/app/shared/services/upload-image/upload-image.service';
import { UploadImageComponent } from '@/app/shared/components/upload-image/upload-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WideAdsBannerComponent } from './wide-ads-banner/wide-ads-banner.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { MatListModule } from '@angular/material/list';
import { CardProfileComponent } from './card-profile/card-profile.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    TabsComponent,
    HeaderProfileComponent,
    UploadImageComponent,
    WideAdsBannerComponent,
    SettingsDialogComponent,
    CardProfileComponent,
  ],
  exports: [
    ButtonComponent,
    ContainerComponent,
    LoadingSpinnerComponent,
    TabsComponent,
    HeaderComponent,
    HeaderProfileComponent,
    WideAdsBannerComponent,
    CardProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
  ],
  providers: [UploadImageService],
})
export class ComponentsSharedModule {}
