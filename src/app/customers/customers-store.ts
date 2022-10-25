import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { map, Observable, of, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { DataService } from '../data.service';
import { CustomerModel } from '../models/customer.model';
import { StoreStateModel } from '../models/store-state.model';


@Injectable()
export class CustomersStore extends ObservableStore<StoreStateModel> {
    subs = new SubSink();
    initialState = {
        customers: [],
        addMode: false,
    };

    constructor(private dataService: DataService) {
        super({
            logStateChanges: true,
        })

        this.setState(this.initialState, 'INIT_STATE');
    }

    get(): Observable<StoreStateModel> {
        const state = this.getState();
        if (state.customers.length) {
            return of(state)
        }

        return this.dataService.getData()
            .pipe(
                map((customers: CustomerModel[]) => {
                    return {
                        ...state,
                        customers,
                    }
                }),
                tap((state) => {
                    this.setState(state, 'RETRIEVED_CUSTOMERS');
                })
            );
    }

    initAddMode(): void {
        const state = this.getState();

        const updatedState = {
            ...state,
            addMode: true
        };

        this.setState(updatedState, 'INIT_ADD_MODE');
    }

    addCustomer(customer: any): void {
        const state = this.getState();
        const ids = state.customers.map(c => c.id)
        const newId = ids.length ? Math.max(...ids) + 1 : 1;
        customer.id =  newId;
        customer.memberSince = new Date();

        const updatedState = {
            ...state,
            customers: [ ...state.customers, customer ],
        };

        this.setState(updatedState, 'ADDED_CUSTOMER');
        this.resetView();
    }

    deleteCustomer(customer: CustomerModel): void {
        const state = this.getState();
        const updatedState = {
            ...state,
            customers: [ ...state.customers.filter((c: CustomerModel) => c.id !== customer.id) ],
        };

        this.setState(updatedState, 'DELETED_CUSTOMER');
        this.resetView();
    }

    resetView(): void {
        const state = this.getState();

        const updatedState = {
            ...state,
            addMode: false,
        };

        this.setState(updatedState, 'RESET_VIEW');
    }
}
