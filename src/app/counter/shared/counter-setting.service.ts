import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy } from './shared';
import { RuntimeEnvironment } from './shared';

export interface ICounterSetting {
  branch_code: string;
  counter_code: string;
  enable_recording: boolean;
  upload_url: string;
  addr_led: number;
  mini_hight: number;
  mini_width: number;
}

@Injectable()
export class CounterSettingService extends SmallStorage<ICounterSetting> {
  constructor(
    private xwinStorage: XWinStorageStrategy,
    private env: RuntimeEnvironment
  ) {
    super("counter", xwinStorage);
  }

  Update(data: ICounterSetting) {
    this.data.branch_code = data.branch_code;
    this.data.counter_code = data.counter_code;
    this.data.enable_recording = data.enable_recording;
    this.data.upload_url = data.upload_url;
    this.data.addr_led = data.addr_led;
    this.data.mini_hight = data.mini_hight;
    this.data.mini_width = data.mini_width;
    this.SaveData();
  }

  Check() {
    this.checked = true;
    return this.data.branch_code && this.data.counter_code;
  }

  get MiniHight() {
    return this.data.mini_hight;
  }

  get MiniWidth() {
    return this.data.mini_width;
  }

  get AddrLed() {
    return this.data.addr_led;
  }

  get UploadUrl() {
    return this.data.upload_url || this.baseUploadURL;
  }

  get IsChecked() {
    return this.checked;
  }

  private baseUploadURL = `${this.env.Platform.Http}/api/report/record/`;

  private checked = false;
}