import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CustomersStore } from './customers/customers-store';
import { CustomersStoreStub } from './testing/customers-store.stub';

const customersStoreStub = new CustomersStoreStub();

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            providers: [
                { provide: CustomersStore, useValue: customersStoreStub },
            ],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    afterEach(fakeAsync(() => {
        flush();
    }));

    describe('getInitialState()', () => {
        it('should call "customersStore.get()"', () => {
            const spy = spyOn(customersStoreStub, 'get');
            
            component.getInitialState();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('listenForStateChange()', () => {
        it('should return whatever "customerStore.stateChanged" does', fakeAsync(() => {
            const mockData = { customers: [], addMode: false };

            component.listenForStateChange()
                .subscribe({
                    next: data => {
                        expect(data).toEqual(mockData);
                    },
                });
        }));
    });
});
