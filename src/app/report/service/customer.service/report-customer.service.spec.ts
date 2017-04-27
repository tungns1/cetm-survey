import { TestBed, inject } from '@angular/core/testing';

import { ReportCustomerService } from './report-customer.service';

describe('ReportCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportCustomerService]
    });
  });

  it('should ...', inject([ReportCustomerService], (service: ReportCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
