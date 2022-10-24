import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  addUser() {
    console.log(this.addCustomerForm.value)
  }

  cancel() {
    this.addCustomerForm.reset();
  }

}
