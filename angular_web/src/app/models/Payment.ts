import { Appointment } from './Appointment'

export class Payment {
    id: string;
    appointment: Appointment | undefined;
    amount: number;
    paymentDate: string;
  
    constructor() {
      this.id = '';
      this.amount = 0;
      this.paymentDate = '';      
    }    
  }
  