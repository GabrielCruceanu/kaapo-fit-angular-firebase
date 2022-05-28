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
import { AddMeasurementsComponent } from './add-measurements/add-measurements.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    TabsComponent,
    HeaderProfileComponent,
    UploadImageComponent,
    AddMeasurementsComponent,
  ],
  exports: [
    ButtonComponent,
    ContainerComponent,
    LoadingSpinnerComponent,
    TabsComponent,
    HeaderComponent,
    HeaderProfileComponent,
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
  ],
  providers: [UploadImageService],
})
export class ComponentsSharedModule {}
