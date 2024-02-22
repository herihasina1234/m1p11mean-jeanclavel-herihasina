import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/api/appointment_service/appointment.service';
import { PaymentService } from 'src/app/services/api/payment_service/payment.service';
import { Appointment } from 'src/app/models/Appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  
  paymentStatus: Boolean = false;
  status: Boolean = false;
  keyword: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private paymentService: PaymentService
  ){

  }
  
  ngOnInit(): void {
    this.getAppointments();
  }
  
  getAppointments(){
    const status = 'unpaid'
    // this.appointmentService.getAll()
    this.appointmentService.getBySearchParams({ 
      status: this.status, 
      paymentStatus:this.paymentStatus, 
      keyword: this.keyword
    })
      .subscribe({
        next: (response: any) =>  {
          this.appointments = response.response.data;                     
          console.info(response.response.message);
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("getAppointments completed succesfully")
      })    
  }

  payer(appt: any){
    const appointment = appt._id
    const amount = appt.service?.prix
    console.log(appt)
    this.paymentService.create({ appointment, amount })
      .subscribe({
        next: (response: any) =>  {     
          console.log(response)                        
          console.info(response.message);
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("save payment completed succesfully")
      })   
    
  }
}
