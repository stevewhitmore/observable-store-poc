import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersStore, StoreStateModel } from './customers/customers-store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  state$ = this.customersStore.stateChanged;

  constructor(private customersStore: CustomersStore) {}

  ngOnInit(): void {
    this.customersStore.getCustomers();
  }
}
