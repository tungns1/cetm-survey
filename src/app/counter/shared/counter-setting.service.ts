import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy } from './shared';

export interface ICounterSetting {
  branch_code: string;
  counter_code: string;
  enable_recording: boolean;
}

@Injectable()
export class CounterSettingService extends SmallStorage<ICounterSetting> {
  constructor(
    private xwinStorage: XWinStorageStrategy
  ) {
    super("counter", xwinStorage);
  }

  Update(branch_code: string, counter_code: string, enable_recording: boolean) {
    this.data.branch_code = branch_code;
    this.data.counter_code = counter_code;
    this.data.enable_recording = enable_recording;
    this.SaveData();
  }

  Check() {
    this.checked = true;
    return this.data.branch_code && this.data.counter_code;
  }

  get IsChecked() {
    return this.checked;
  }

  private checked = false;
}