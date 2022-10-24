import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CustomerModel } from "../models/customer.model";

@Injectable()
export class CustomersStoreStub {
    state = {
        customers: [],
        addMode: false,
    };
    stateChanged = new BehaviorSubject(this.state);
    
    get() {}

    initAddMode() {}

    addCustomer(customer: CustomerModel) {}

    deleteCustomer(customer: CustomerModel) {}

    resetView() {}

    updateStubState(state: any) {
        this.state = state;
    }
}