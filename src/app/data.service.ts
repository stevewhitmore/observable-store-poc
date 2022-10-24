import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from './customers/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<CustomerModel[]> {
    return this.httpClient.get('./assets/customers.json') as Observable<CustomerModel[]>;
  }
}
