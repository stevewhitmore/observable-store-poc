import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { CustomersStore } from './customers/customers-store';
import { StoreStateModel } from './models/store-state.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  state$: Observable<any> | undefined;

  constructor(private customersStore: CustomersStore) {}

  ngOnInit(): void {
    const initialFetch$ = this.getInitialState();
    const updatedState$ = this.listenForStateChange();
    this.state$ = merge(initialFetch$, updatedState$)
  }

  getInitialState(): Observable<StoreStateModel> {
    return this.customersStore.get();
  }

  listenForStateChange(): Observable<StoreStateModel> {
    return this.customersStore.stateChanged;
  }

}
