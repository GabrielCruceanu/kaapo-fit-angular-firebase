import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInformationComponent } from './view/add-information.component';
import { ComponentsSharedModule } from '../shared/components/components-shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { AddInformationRoutingModule } from '@/app/add-information/add-information-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AddInformationComponent],
  imports: [
    CommonModule,
    ComponentsSharedModule,
    AddInformationRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatIconModule,
  ],
})
export class AddInformationModule {}
