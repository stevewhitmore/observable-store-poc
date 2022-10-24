import { Component, Input } from '@angular/core';
import { CustomerModel } from './customer.model';
import { CustomersStore, StoreStateModel } from './customers-store';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @Input() customersData: CustomerModel[] = [];
  @Input() state: StoreStateModel | undefined;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'memberSince', 'delete'];
  addClicked = false;

  constructor(private customersStore: CustomersStore) {}

  addCustomer() {
    this.customersStore.initAddMode();
  }

  deleteCustomer(customer: CustomerModel) {
    this.customersStore.deleteCustomer(customer);
  }

}
