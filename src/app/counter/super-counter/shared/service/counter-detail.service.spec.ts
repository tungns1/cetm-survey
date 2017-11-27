import { TestBed, inject } from '@angular/core/testing';

import { CounterDetailService } from './counter-detail.service';

describe('CounterDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterDetailService]
    });
  });

  it('should be created', inject([CounterDetailService], (service: CounterDetailService) => {
    expect(service).toBeTruthy();
  }));
});
