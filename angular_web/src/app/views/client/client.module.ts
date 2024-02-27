import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, AccordionModule, SharedModule, PaginationModule, SpinnerModule } from '@coreui/angular';
import { PrendreRvComponent } from 'src/app/views/client/prendre-rv/prendre-rv.component';
import { PaginationComponent } from 'src/app/views/client/pagination/pagination.component';
import { AppointmentListComponent } from 'src/app/views/client/appointment-list/appointment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule, IconSetService } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    ServicesListComponent,
    PrendreRvComponent,
    AppointmentListComponent,
    PaginationComponent
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
    SharedModule,
    PaginationModule,
    SpinnerModule,
    IconModule
  ],
  providers:[
    IconSetService
  ]
})
export class ClientModule { }
