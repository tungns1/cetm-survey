import { TestBed, inject } from '@angular/core/testing';

import { MonitorSummaryService } from './monitor-summary.service';

describe('MonitorSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorSummaryService]
    });
  });

  it('should ...', inject([MonitorSummaryService], (service: MonitorSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
