import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../global-constants';
import { Service } from "src/app/models/Service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = GlobalConstants.apiURL + "services";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {        
    return this.http.post(this.baseUrl, data);
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

  findByTitle(title: any): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}?title=${title}`);
  }
}
