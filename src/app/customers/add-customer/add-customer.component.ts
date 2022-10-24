import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersStore } from '../customers-store';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  formIsValid = false;
  customersStore: CustomersStore;
  addCustomerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    customersStore: CustomersStore,  
  ) {
    this.customersStore = customersStore;
  }
}
