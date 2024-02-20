import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/api/service_service/service.service';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent implements OnInit {
  services: Service[] = [];
  
  constructor(
    private serviceService: ServiceService,
    private prendreRvService: PrendreRvService
  ){

  }
  
  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(){
    this.serviceService.getAll()
      .subscribe({
        next: (response: any) =>  {
          this.services = response.response.data;                     
          console.info(response.response.message);
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("getAllServices completed succesfully")
      })    
  }
  
  addServiceToCart(service: Service){
    this.prendreRvService.addToCart(service);
  };
}
