import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table'; 
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CustomersStore } from './customers/customers-store';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomersStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
