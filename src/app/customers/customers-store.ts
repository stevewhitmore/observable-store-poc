import { Injectable, OnDestroy } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { of, tap } from "rxjs";
import { SubSink } from "subsink";
import { DataService } from "../data.service";
import { CustomerModel } from "./customer.model";

export interface StoreStateModel {
    customers: CustomerModel[] | [];
    addMode: boolean;
}

@Injectable()
export class CustomersStore extends ObservableStore<StoreStateModel> implements OnDestroy {
    subs = new SubSink();

    constructor(private dataService: DataService) {
        const initialState = {
            customers: [],
            addMode: false,
        };
        super({
            logStateChanges: true,
        })

        this.setState(initialState, 'INIT_STATE');
    }

    get() {
        const state = this.getState();
        return of(state);
    }

    getCustomers() {
        this.subs.sink = this.dataService.getData()
            .subscribe({
                next: ((customers: CustomerModel[]) => {
                    console.log('foo')
                    this.updateCustomers(customers);
                }),
            });
    }

    updateCustomers(customers: CustomerModel[]) {
        this.setState({ customers }, 'RETRIEVED_CUSTOMERS');
    }

    initAddMode() {
        const state = this.getState();

        const updatedState = {
            ...state,
            addMode: true
        };

        this.setState(updatedState, 'INIT_ADD_MODE');
    }

    addCustomer(customer: any) {
        const state = this.getState();
        customer.id = Math.floor(Math.random() * 9999) + 1;
        customer.memberSince = new Date();

        const updatedState = {
            ...state,
            customers: [ ...state.customers, customer ],
        };

        this.setState(updatedState, 'ADDED_CUSTOMER');
    }

    deleteCustomer(customer: CustomerModel) {
        const state = this.getState();
        const updatedState = {
            ...state,
            customers: [ ...state.customers.filter((c: CustomerModel) => c.id !== customer.id) ],
        };

        this.setState(updatedState, 'DELETED_CUSTOMER');
        this.resetView();
    }

    resetView() {
        const state = this.getState();

        const updatedState = {
            ...state,
            addMode: false,
        };

        this.setState(updatedState, 'RESET_VIEW');
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}