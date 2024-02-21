import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//date format jj-mm-aaaaThh:mm:ss
export class DateService {

  constructor() { }

  formatDate(date: Date) {
    const d = new Date(date);
    let minute = '' + (d.getMinutes() + 1);
    let hour = '' + (d.getHours());        
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${day}-${month}-${year}T${hour}:${minute}`;
  }

  formatToDb(date: Date) {
    const d = new Date(date);
    let minute = '' + (d.getMinutes() + 1);
    let hour = '' + (d.getHours());        
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
  }

  formatToDisplay(date: Date){    
    return this.formatDate(date).replace(new RegExp('T', 'g'), ' ');
  }


  strToDate(dateTimeString: string): Date{
    let [datePart, timePart] = dateTimeString.split('T');
    let [year, month, day] = datePart.split('-').map(Number);
    let [hours, minutes] = timePart.split(':').map(Number);
    let seconds = 0
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
}
