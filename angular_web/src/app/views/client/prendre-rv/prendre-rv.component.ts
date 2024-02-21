import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';
import { DateService } from 'src/app/services/date/date.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/api/user_service/user.service';
import { Appointment } from 'src/app/models/Appointment';
import { JWTTokenService } from 'src/app/services/token_service/jwt-token.service';

@Component({
  selector: 'app-prendre-rv',
  templateUrl: './prendre-rv.component.html',
  styleUrl: './prendre-rv.component.scss'
})
export class PrendreRvComponent implements OnInit{
  cartAppointments$: Observable<Appointment[]> = this.prendreRvService.cartAppointments$;
  prixTotal: number = 0;
  dureeTotal: number = 0;
  dateDebut: Date = new Date();
  dateFin: Date = new Date();
  dateDebutStr: string = '';
  endDateStr: string = '';
  employes: User[] = [];
  private destroyed$ = new Subject<void>();    

  // Define FormGroup to manage the form
  dateTimeForm: FormGroup | undefined | null;    

  constructor(
    private prendreRvService: PrendreRvService,
    private userService: UserService,
    private dateService: DateService,
    private formBuilder: FormBuilder,
    private tokenService: JWTTokenService
    ) {
    }
    
  ngOnInit(): void {
    this.dateTimeForm = this.formBuilder.group({
      requestdate: ['']
    })    
    this.dateTimeForm.get('requestdate')?.patchValue(this.dateService.formatDate(this.dateDebut));
      
    this.initEmployes();
    this.calculate();  
  }

  private calculate(): void {
    // this.calculPrixTotal()    
    // this.calculDureeTotal()
    // this.calculDate()    
  }

  //                                                                                                                          
  //initialisation listes des employes
  initEmployes(){
   this.userService.get("fonction=employe")
    .subscribe({
      next: (response: any) =>  {
        this.employes = response.response.data;
        console.info(response.response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("initEmployes completed succesfully")
    })  
  }

  onSubmit(): void {
    this.calculate();
  }

  
  onSelect(employee_index: number, appointment_index: number){    
    this.prendreRvService.updateEmploye(this.employes[employee_index], appointment_index)
  }


  validateRv(): void {       
    this.prendreRvService.save();
  }

  saveRendezVous() {       
    const data = {
      client: "65d3dfb4e8d71a29306ed2a8",
      taches: [],
      dateDebut: this.dateService.formatToDb(this.dateDebut),
      dateFin: this.dateService.formatToDb(this.dateFin),
      status: 1
    };
    
    // this.userService.create(data)
    //   .subscribe(
    //     (response: any) => { 
    //       this.authenticationService.login(this.user);
    //     }, 
    //     (error: any) => console.log(error)
    //   )
  };

  formatDateTime(appointment: Appointment){    
    let ed = this.dateService.strToDate(appointment.startDate)
    if(appointment.service?.duree)
      ed.setMinutes(appointment.service.duree + ed.getMinutes())
    
    //formatage pour l'insertion dans monogodb
    appointment.startDate = appointment.startDate + ':00Z'
    appointment.endDate = this.dateService.formatToDb(ed)
    
    this.endDateStr = this.dateService.formatToDisplay(ed)    
  }
  
  removeProductFromCart = (id: number): void => {
    this.prendreRvService.removeFromCart(id);
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
