import { TestBed, inject } from '@angular/core/testing';

import { MonitorFocusService } from './monitor-focus.service';

describe('MonitorFocusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorFocusService]
    });
  });

  it('should ...', inject([MonitorFocusService], (service: MonitorFocusService) => {
    expect(service).toBeTruthy();
  }));
});
