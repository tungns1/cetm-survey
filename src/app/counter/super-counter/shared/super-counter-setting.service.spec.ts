import { TestBed, inject } from '@angular/core/testing';

import { SuperCounterSettingService } from './super-counter-setting.service';

describe('SuperCounterSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperCounterSettingService]
    });
  });

  it('should be created', inject([SuperCounterSettingService], (service: SuperCounterSettingService) => {
    expect(service).toBeTruthy();
  }));
});
