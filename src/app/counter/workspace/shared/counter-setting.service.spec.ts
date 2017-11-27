import { TestBed, inject } from '@angular/core/testing';

import { CounterSettingService } from './counter-setting.service';

describe('CounterSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterSettingService]
    });
  });

  it('should ...', inject([CounterSettingService], (service: CounterSettingService) => {
    expect(service).toBeTruthy();
  }));
});
