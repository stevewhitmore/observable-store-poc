import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { StoreStateModel } from '../models/store-state.model';
import { CustomersStore } from './customers-store';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnChanges {
  @Input() state: StoreStateModel = { customers: [], addMode: false };
  customersData: CustomerModel[] = [];
  customersStore: CustomersStore;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'memberSince', 'delete'];

  constructor(customersStore: CustomersStore) {
    this.customersStore = customersStore;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const stateChanges = changes['state'];
    if (stateChanges && stateChanges.currentValue) {
      this.customersData = stateChanges.currentValue.customers;
    }
  }
}
