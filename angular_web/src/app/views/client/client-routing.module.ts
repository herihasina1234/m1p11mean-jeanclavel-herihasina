import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { PrendreRvComponent } from './prendre-rv/prendre-rv.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';


const routes:Routes = [
  {
    path: 'services',
    component: ServicesListComponent
  },
  {
    path: 'prendre-rv',
    component: PrendreRvComponent
  },
  {
    path: 'appointment-future',
    component: AppointmentListComponent
  }
] 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
