import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

const mockData = require('../assets/customers.json');

describe('DataService', () => {
  let dataService: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    dataService = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpMock.verify();
  })

  describe('getData()', () => {
    it('should get the data', fakeAsync(() => {
      dataService.getData()
        .subscribe(data => {
          expect(data).toEqual(mockData);
        });

      const request = httpMock.expectOne('./assets/customers.json');
      expect(request.request.method).toBe('GET');
    }));
  });
});
