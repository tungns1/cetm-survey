import { TestBed, async, inject } from '@angular/core/testing';

import { AccessRightGuard } from './access-right.guard';

describe('AccessRightGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessRightGuard]
    });
  });

  it('should ...', inject([AccessRightGuard], (guard: AccessRightGuard) => {
    expect(guard).toBeTruthy();
  }));
});
