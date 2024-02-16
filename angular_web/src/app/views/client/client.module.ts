import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { ButtonModule, CardModule, GridModule } from '@coreui/angular';



@NgModule({
  declarations: [
    ServicesListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GridModule,
    CardModule,
    ButtonModule
  ]
})
export class ClientModule { }
