import { User } from './User'
import { Service } from './Service'

export class Appointment {
    id: string;
    customer: User | undefined;
    employee: User | undefined;
    service: Service | undefined;
    startDate: string;
    endDate: string;
    createdAt: string;
  
    constructor() {
      this.id = '';
      this.startDate = '';
      this.endDate = '';
      this.createdAt = '';
    }    
  }
  