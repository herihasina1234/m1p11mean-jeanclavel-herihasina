import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Service } from 'src/app/models/Service';

@Injectable({
  providedIn: 'root'
})
export class PrendreRvService {
  private cartServiceSubject: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>([]);
  public cartServices$ = this.cartServiceSubject.asObservable();
  
  constructor() { }

  
  addToCart(service: Service) {
    const currentProducts = [...this.cartServiceSubject.getValue()];
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.id === service.id
    );

    if (existingProductIndex < 0) {      
      // If the product doesn't exist in the cart, add it with quantity = 1
      this.cartServiceSubject.next([
        ...currentProducts,
        { ...service },
      ]);
    } 
  }


  removeFromCart(index: number) {
    const currentProducts = this.cartServiceSubject.getValue();
    currentProducts.splice(index, 1);
    this.cartServiceSubject.next(currentProducts);
  }
}
