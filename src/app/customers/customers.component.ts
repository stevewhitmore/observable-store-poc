import { Component, Input } from '@angular/core';
import { CustomerModel } from './customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @Input() customersData: CustomerModel[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'memberSince', 'delete'];
  addClicked = false;

  addCustomer() {
    this.addClicked = true;
  }

}
