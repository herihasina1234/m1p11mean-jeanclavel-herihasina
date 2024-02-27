export class Service {
    _id: string;
    designation: string;
    description: string;
    duree: number;
    prix: number;
    commission: number;
    img: string | undefined;
  
    constructor() {
      this._id = '';
      this.designation = '';
      this.description = '';
      this.duree = 0;
      this.prix = 0;
      this.commission = 0;
      }
  }
  