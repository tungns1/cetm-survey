import { TestBed, inject } from '@angular/core/testing';

import { SuperCounterService } from './super-counter.service';

describe('SuperCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperCounterService]
    });
  });

  it('should be created', inject([SuperCounterService], (service: SuperCounterService) => {
    expect(service).toBeTruthy();
  }));
});
