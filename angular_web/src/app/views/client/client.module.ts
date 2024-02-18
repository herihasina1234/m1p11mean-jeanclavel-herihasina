import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { PrendreRvComponent } from 'src/app/views/client/prendre-rv/prendre-rv.component';



@NgModule({
  declarations: [
    ServicesListComponent,
    PrendreRvComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GridModule,
    CardModule,
    ButtonModule,    
    FormModule
  ]
})
export class ClientModule { }
