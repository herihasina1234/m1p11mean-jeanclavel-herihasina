import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';
import { DateService } from 'src/app/services/date/date.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/api/user_service/user.service';

@Component({
  selector: 'app-prendre-rv',
  templateUrl: './prendre-rv.component.html',
  styleUrl: './prendre-rv.component.scss'
})
export class PrendreRvComponent implements OnInit{
  cartServices$: Observable<Service[]> = this.prendreRvService.cartServices$;
  prixTotal: number = 0;
  dureeTotal: number = 0;
  dateDebut: Date = new Date();
  dateFin: Date = new Date();
  dateDebutStr: string = '';
  dateFinStr: string = '';
  employes: User[] = [];
  private destroyed$ = new Subject<void>();    

  // Define FormGroup to manage the form
  dateTimeForm: FormGroup | undefined | null;    

  constructor(
    private prendreRvService: PrendreRvService,
    private userService: UserService,
    private dateService: DateService,
    private formBuilder: FormBuilder
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
    this.calculPrixTotal()    
    this.calculDureeTotal()
    this.calculDate()    
  }

  //calcul prix total
  calculPrixTotal(){
    this.cartServices$
      .pipe(
        map((cartServices) => {
          return cartServices.reduce((acc, service) => {   
            return acc + service.prix.valueOf()
          }, 0);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((total) => {
        this.prixTotal = total;
      });
  }

  //calcul duree total
  calculDureeTotal(){
    this.cartServices$
    .pipe(
      map((cartServices) => {
          return cartServices.reduce((acc, service) => {   
            return acc + service.duree.valueOf()
          }, 0);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((total) => {
        this.dureeTotal = total;
      });
  }

  //calcule heure fin
  calculDate(){
    this.dateDebut = this.dateService.strToDate(this.dateTimeForm?.get('requestdate')?.value)
    this.dateFin = this.dateService.strToDate(this.dateTimeForm?.get('requestdate')?.value)
    this.dateFin.setMinutes(this.dateFin.getMinutes() + this.dureeTotal)
    
    //formater pour afficher
    this.dateDebutStr = this.dateService.formatToDisplay(this.dateDebut)
    this.dateFinStr = this.dateService.formatToDisplay(this.dateFin)
  }

  //initialisation listes des employes
  initEmployes(){
   this.userService.get("employe")
    .subscribe({
      next: (response: any) =>  {
        this.employes = response.response.data;
        console.log(this.employes);
        console.info(response.response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("initEmployes completed succesfully")
    })  
  }

  // Méthode appelée lorsqu'une option est sélectionnée
  onSelect(optionValue: Event) {    
    const selected = ( optionValue?.target as HTMLSelectElement ).value
    console.log(selected);
  }

  onSubmit(): void {
    this.calculate();
  }

  validateRv(): void {
    alert("validateRv successfull");
  }
  
  removeProductFromCart = (id: number): void => {
    this.prendreRvService.removeFromCart(id);
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
