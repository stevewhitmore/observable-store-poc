import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { CustomerModel } from './customers/customer.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  customersData$: Observable<CustomerModel[]> = of([]);
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.customersData$ = this.dataService.getData();
  }
}
