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
    status: boolean;
  
    constructor() {
      this.id = '';
      this.startDate = '';
      this.endDate = '';
      this.createdAt = '';
      this.status = false
    }    
  }
  