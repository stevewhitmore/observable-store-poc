import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersStore } from '../customers-store';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  formIsValid = false;
  addCustomerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private customersStore: CustomersStore,  
  ) {}

  addUser() {
    this.customersStore.addCustomer(this.addCustomerForm.value);
  }

  cancel() {
    this.customersStore.resetView();
  }

}
