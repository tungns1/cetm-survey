import { TestBed, inject } from '@angular/core/testing';

import { CounterListService } from './counter-list.service';

describe('CounterListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterListService]
    });
  });

  it('should be created', inject([CounterListService], (service: CounterListService) => {
    expect(service).toBeTruthy();
  }));
});
