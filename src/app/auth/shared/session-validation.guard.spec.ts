import { TestBed, async, inject } from '@angular/core/testing';

import { SessionValidationGuard } from './session-validation.guard';

describe('SessionValidationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionValidationGuard]
    });
  });

  it('should ...', inject([SessionValidationGuard], (guard: SessionValidationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
