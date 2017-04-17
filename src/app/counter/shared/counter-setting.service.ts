import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy } from './shared';
import { RuntimeEnvironment } from './shared';

export interface ICounterSetting {
  branch_code: string;
  counter_code: string;
  enable_recording: boolean;
  upload_url: string;
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
    this.SaveData();
  }

  Check() {
    this.checked = true;
    return this.data.branch_code && this.data.counter_code;
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