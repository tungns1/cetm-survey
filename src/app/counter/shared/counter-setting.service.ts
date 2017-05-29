import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy } from './shared';
import { RuntimeEnvironment } from './shared';

export interface ICounterSetting {
  branch_code: string;
  counter_code: string;
  enable_recording: boolean;
  record_upload_url: string;
  mini_height: number;
  mini_width: number;
  led_addr: number;
  led_com_port: string;
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
    this.data.record_upload_url = data.record_upload_url;
    this.data.led_addr = data.led_addr;
    this.data.mini_height = data.mini_height;
    this.data.mini_width = data.mini_width;
    this.data.led_com_port = data.led_com_port;
    this.SaveData();
  }

  Check() {
    this.checked = true;
    return this.data.branch_code && this.data.counter_code;
  }

  get MiniHight() {
    return this.data.mini_height;
  }

  get MiniWidth() {
    return this.data.mini_width;
  }

  get AddrLed() {
    return this.data.led_addr;
  }

  get ComLed() {
    return this.data.led_com_port;
  }

  get UploadUrl() {
    return this.data.record_upload_url || this.baseUploadURL;
  }

  get IsChecked() {
    return this.checked;
  }

  private baseUploadURL = `${this.env.Platform.Http}/api/report/record/`;

  private checked = false;
}