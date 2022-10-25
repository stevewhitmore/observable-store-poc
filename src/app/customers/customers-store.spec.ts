import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { CustomersStore } from './customers-store';

import { DataService } from '../data.service';
import { of } from 'rxjs';

const mockData = require('../../assets/customers.json');
const dataServiceStub = {
    getData: () => of([]),
}

describe('CustomersStore', () => {
  let customersStore: CustomersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        CustomersStore,
        { provide: DataService, useValue: dataServiceStub }
       ],
    });

    customersStore = TestBed.inject(CustomersStore);
  });

  afterEach(fakeAsync(() => {
    flush();
  }));

  describe('get()', () => {
    it('should call "dataService.getData()" if no customers are present', () => {
        const spy = spyOn(dataServiceStub, 'getData').and.callThrough();

        customersStore.get();

        expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('initAddMode()', () => {
    it('should update the state with "addMode" being true', fakeAsync(() => {
        customersStore.initAddMode();

        customersStore.get()
            .subscribe({
                next: data => {
                    expect(data.addMode).toBeTrue();
                }
            })
    }));
  });

  describe('addCustomer()', () => {
    it('should set the ID to 1 if no customers are present', fakeAsync(() => {
        customersStore.addCustomer(mockData[0]);

        customersStore.get()
            .subscribe({
                next: data => {
                    expect(data.customers[0].id).toBe(1);
                }
            });
    }));

    it('should set the ID to 1 more than the last one', fakeAsync(() => {
        customersStore.addCustomer(mockData[0]);
        customersStore.addCustomer(mockData[1]);

        customersStore.get()
            .subscribe({
                next: data => {
                    expect(data.customers[1].id).toBe(2);
                }
            });
    }));

    it('should set the "memberSince" property to today\'s date', fakeAsync(() => {
        customersStore.addCustomer(mockData[0]);

        customersStore.get()
            .subscribe({
                next: data => {
                    expect(data.customers[0].memberSince).toEqual(new Date());
                }
            });
    }));
  });

  describe('deleteCustomer()', () => {
    it('should remove the customer passed in', fakeAsync(() => {
        customersStore.addCustomer(mockData[0]);
        customersStore.addCustomer(mockData[1]);

        customersStore.deleteCustomer(mockData[0]);

        customersStore.get()
            .subscribe({
                next: data => {
                    expect(data.customers[0]).toEqual(mockData[1]);
                    expect(data.customers.length).toBe(1);
                }
            });
    }));
  });

  describe('resetView()', () => {
    it('should set the "addMode" property to false', fakeAsync(() => {
        customersStore.initAddMode();

        customersStore.resetView();

        customersStore.get()
            .subscribe({
                next: data => {
                    expect(data.addMode).toBeFalse();
                }
            });
    }));
  });
});
