import { Component } from '@angular/core';
import { Observable, Subject, Timestamp, map, takeUntil } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';

@Component({
  selector: 'app-prendre-rv',
  templateUrl: './prendre-rv.component.html',
  styleUrl: './prendre-rv.component.scss'
})
export class PrendreRvComponent {
  cartServices$: Observable<Service[]> = this.prendreRvService.cartServices$;
  prixTotal: number | undefined = undefined;
  dureeTotal: number | undefined = undefined;
  dateDebut: number | undefined = undefined;
  dateFin: number | undefined = undefined;
  private destroyed$ = new Subject<void>();  

  constructor(private prendreRvService: PrendreRvService) {
    this.calculateTotal();
  }


  private calculateTotal(): void {
    //calcul prix total
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

    //calcul duree total
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
