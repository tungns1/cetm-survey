import { TestBed, inject } from '@angular/core/testing';

import { ComposeService } from './compose.service';

describe('ComposeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComposeService]
    });
  });

  it('should ...', inject([ComposeService], (service: ComposeService) => {
    expect(service).toBeTruthy();
  }));
});
