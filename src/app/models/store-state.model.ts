import { CustomerModel } from "./customer.model";

export interface StoreStateModel {
    customers: CustomerModel[] | [];
    addMode: boolean;
}