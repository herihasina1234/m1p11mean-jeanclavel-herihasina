import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = GlobalConstants.apiURL + "appointment";
  private dataListSubject: BehaviorSubject<any[]> = new BehaviorSubject<Appointment[]>([]);
  public dataList$: Observable<Appointment[]> = this.dataListSubject.asObservable();


  constructor(private http: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {        
    return this.http.post(this.baseUrl, data);
  }

  createMany(data: any): Observable<any> {        
    return this.http.post(`${this.baseUrl}/many`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  getBySearchParams(params: any): void {
    const queryParams = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

    console.log(queryParams)
    this.http.get<Appointment[]>(`${this.baseUrl}/search?${queryParams}`).subscribe({
      next: (response: any) =>  {
        this.dataListSubject.next(response.data);
        console.info(response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("getAppointments completed succesfully")

    })
  }
}
