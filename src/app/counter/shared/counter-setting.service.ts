import { Injectable } from '@angular/core';
import { SmallStorage } from './shared';

export interface ICounterSetting {
  branch_code: string;
  counter_code: string;
}

@Injectable()
export class CounterSettingService extends SmallStorage<ICounterSetting> {
  constructor() {
    super("counter");
  }

  Update(branch_code: string, counter_code: string) {
    this.data.branch_code = branch_code;
    this.data.counter_code = counter_code;
    this.SaveData();
  }

  Check() {
    this.checked = true;
    return this.checked;
  }

  get IsChecked() {
    return this.checked;
  }

  private checked = false;
}