import { TestBed, inject } from '@angular/core/testing';

import { MonitorCustomerService } from './monitor-customer.service';

describe('MonitorCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorCustomerService]
    });
  });

  it('should ...', inject([MonitorCustomerService], (service: MonitorCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
