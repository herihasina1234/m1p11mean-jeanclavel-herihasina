import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';
import { DateService } from 'src/app/services/date/date.service';

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
  private destroyed$ = new Subject<void>();    

  // Define FormGroup to manage the form
  dateTimeForm: FormGroup | undefined | null;    

  constructor(
    private prendreRvService: PrendreRvService,
    private dateService: DateService,
    private formBuilder: FormBuilder
    ) {
    }
    
  ngOnInit(): void {
    this.dateTimeForm = this.formBuilder.group({
      requestdate: ['']
    })    
    this.dateTimeForm.get('requestdate')?.patchValue(this.dateService.formatDate(this.dateDebut));
    //this.placeholderText = this.dateService.formatDate(this.dateDebut);
      
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

  validateRv(): void {
    alert("validateRv successfull");
  }
  
  onSubmit(): void {
    this.calculate();
  }

  removeProductFromCart = (id: number): void => {
    this.prendreRvService.removeFromCart(id);
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
