import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { CustomersStoreStub } from "../testing/customers-store.stub";
import { CustomersStore } from "./customers-store";
import { CustomersComponent } from "./customers.component";

const customersStoreStub = new CustomersStoreStub();

const mockData = require('../../assets/customers.json');

describe('CustomersComponent', () => {
    let component: CustomersComponent;
    let fixture: ComponentFixture<CustomersComponent>
    let debugEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatButtonModule,
                MatTableModule,
                MatIconModule,
                ReactiveFormsModule,
            ],
            declarations: [ CustomersComponent ],
            providers: [
                { provide: CustomersStore, useValue: customersStoreStub },
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });

        fixture = TestBed.createComponent(CustomersComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
    });

    it('should trigger "customersStore.deleteCustomer()"', () => {
        // const spy = spyOn(customersStoreStub, 'deleteCustomer').and.callThrough();

        // component.customersData = [ mockData ];
        // fixture.detectChanges();
        // const button = debugEl.nativeElement.querySelector('.deletebtn');
        // button.click();

    });

    describe('Add button', () => {
        it('should be disabled if state is in "INIT_ADD_MODE', fakeAsync(() => {
            component.state.addMode = true;
            fixture.detectChanges();
            tick();

            const addButton = debugEl.query(By.css('.addBtn')).nativeElement;

            expect(addButton.attr.disabled).toBeTrue();
        }));
    });
});
