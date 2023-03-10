import { RouterModule, Routes } from '@angular/router';
import { AddInformationComponent } from '@/app/add-information/view/add-information.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AddInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInformationRoutingModule {}
