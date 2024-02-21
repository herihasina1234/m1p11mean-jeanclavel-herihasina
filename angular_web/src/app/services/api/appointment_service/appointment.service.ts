import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = GlobalConstants.apiURL + "appointment";

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

  findByTitle(title: any): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}?title=${title}`);
  }
}
