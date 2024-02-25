import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, AccordionModule, SharedModule } from '@coreui/angular';
import { PrendreRvComponent } from 'src/app/views/client/prendre-rv/prendre-rv.component';
import { AppointmentListComponent } from 'src/app/views/client/appointment-list/appointment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ServicesListComponent,
    PrendreRvComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GridModule,
    CardModule,
    ButtonModule,    
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    AccordionModule,
    SharedModule
  ]  
})
export class ClientModule { }
