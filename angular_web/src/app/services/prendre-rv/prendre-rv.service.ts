import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { Service } from 'src/app/models/Service';
import { AppointmentService } from 'src/app/services/api/appointment_service/appointment.service'
import { JWTTokenService } from '../token_service/jwt-token.service';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class PrendreRvService {
  private cartAppointmentSubject: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);
  public cartAppointments$ = this.cartAppointmentSubject.asObservable();
  
  constructor(
    private appointmentService: AppointmentService,
    private tokenService: JWTTokenService
  ) { }

  
  addToCart(service: Service) {
    const currentProducts = [...this.cartAppointmentSubject.getValue()];
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.service?.id === service.id
    );

    let appointment = new Appointment();
    appointment.service = service;   
    appointment.customer = this.tokenService.user 
    if (existingProductIndex < 0) {      
      // If the product doesn't exist in the cart, add it with quantity = 1
      this.cartAppointmentSubject.next([
        ...currentProducts,
        { ...appointment },
      ]);
    } 
  }


  updateEmploye(employe: User, index: number){
    const currentValue = this.cartAppointmentSubject.getValue();
    currentValue[index].employee = employe;
    this.cartAppointmentSubject.next(currentValue);  
  }


  removeFromCart(index: number) {
    const currentProducts = this.cartAppointmentSubject.getValue();
    currentProducts.splice(index, 1);
    this.cartAppointmentSubject.next(currentProducts);
  }


  save(){
    const appointments = [...this.cartAppointmentSubject.getValue()];
    this.appointmentService.createMany(appointments)
      .subscribe({
        next: (response: any) =>  {     
          console.log(response.data)                        
          console.info(response.message);
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("save appointments completed succesfully")
      })   
  }
}
