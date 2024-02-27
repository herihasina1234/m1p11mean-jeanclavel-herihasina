import { User } from './User'
import { Service } from './Service'

export class Appointment {
    _id: string;
    customer: User | undefined;
    employee: User | undefined;
    service: Service | undefined;
    startDate: string;
    endDate: string;
    createdAt: string;
    paymentStatus: boolean;
    status: boolean;
  
    constructor() {
      this._id = '';
      this.startDate = '';
      this.endDate = '';
      this.createdAt = '';
      this.paymentStatus = false
      this.status = false
    }    
  }
  