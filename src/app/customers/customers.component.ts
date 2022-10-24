import { Component, Input } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { StoreStateModel } from '../models/store-state.model';
import { CustomersStore } from './customers-store';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @Input() customersData: CustomerModel[] = [];
  @Input() state: StoreStateModel = { customers: [], addMode: false };
  customersStore: CustomersStore;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'memberSince', 'delete'];

  constructor(customersStore: CustomersStore) {
    this.customersStore = customersStore;
  }
}
