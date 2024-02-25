import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/api/appointment_service/appointment.service';
import { PaymentService } from 'src/app/services/api/payment_service/payment.service';
import { Appointment } from 'src/app/models/Appointment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
  appointments$: Observable<Appointment[]> = this.appointmentService.dataList$;  
  totalPages$: Observable<number> = this.appointmentService.totalPages$;
  paginationTable$: Observable<number[]> = this.appointmentService.paginationTable$;

  //ui searchbar variable

  accordionIsVisible: boolean = false;
  checkPayment: boolean = true;
  checkStatus: boolean = true;
  items = [1, 2, 3, 4];
  
  //searchbar variable

  paymentStatus: boolean = true;
  status: boolean = true;
  keyword: string = '';

  //pagination variable

  currentPage: number = 1;
  pageSize: number = 1;
  totalItems: number = 0;
  

  constructor(
    private appointmentService: AppointmentService,
    private paymentService: PaymentService
  ){

  }
  
  ngOnInit(): void {
    this.refreshAppointments();
  }

  onSearch(value: string){
    this.keyword = value;
    this.refreshAppointments();
  }  

  toggleAccordion(searchAccordion: any){
    searchAccordion.toggleItem();
    this.accordionIsVisible = !this.accordionIsVisible;
    this.refreshAppointments();
  }
  
  refreshAppointments(): void {
    let params:{ 
      status?: boolean, 
      paymentStatus?: boolean, 
      keyword?: string,
      page?: number,
      pageSize?: number
    } = { }
    
    if(!this.accordionIsVisible){
      params = {}
    }
    else{
      if(this.checkPayment) params.paymentStatus = this.paymentStatus 
      if(this.checkStatus) params.status = this.status 
      if(this.keyword !== '') params.keyword = this.keyword
    }
    params.page = this.currentPage
    params.pageSize = this.pageSize


    this.appointmentService.getBySearchParams(params);
  }


  onPageChange(event: any): void {
    this.currentPage = event;
    this.refreshAppointments();
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
