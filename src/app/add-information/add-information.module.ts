import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInformationComponent } from './add-information.component';
import {ComponentsSharedModule} from "../shared/components/components-shared.module";
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [{path: '', component: AddInformationComponent}]

@NgModule({
  declarations: [
    AddInformationComponent
  ],
  imports: [
    CommonModule,
    ComponentsSharedModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule
  ]
})
export class AddInformationModule { }
