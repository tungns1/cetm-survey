import { TestBed, async, inject } from '@angular/core/testing';

import { CounterWelcomeGuard } from './counter-welcome.guard';

describe('CounterWelcomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterWelcomeGuard]
    });
  });

  it('should ...', inject([CounterWelcomeGuard], (guard: CounterWelcomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
