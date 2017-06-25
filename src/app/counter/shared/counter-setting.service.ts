import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy, XWinMiniMode } from './shared';
import { RuntimeEnvironment, ICounterConfig, ProjectConfig } from './shared';

export interface ICounterSetting extends ICounterConfig {
  branch_code: string;
  counter_code: string;
  record_upload_url: string;
  led_addr: number;
  led_com_port: string;
  mini_mode: XWinMiniMode;
}

@Injectable()
export class CounterSettingService extends SmallStorage<ICounterSetting> {
  constructor(
    private xwinStorage: XWinStorageStrategy,
    private env: RuntimeEnvironment
  ) {
    super("counter", xwinStorage);
    this.data.mini_mode = this.data.mini_mode || <any>{};
  }

  Update(data: ICounterSetting) {
    const auth_update = this.data.branch_code !== data.branch_code || this.data.counter_code !== data.counter_code;
    this.data.branch_code = data.branch_code;
    this.data.counter_code = data.counter_code;
    // record
    this.data.record_transaction = data.record_transaction;
    this.data.record_upload_url = data.record_upload_url;
    // led
    this.data.led_addr = data.led_addr;
    this.data.led_com_port = data.led_com_port;
    this.data.mini_mode = data.mini_mode;
    this.SaveData();
    return auth_update;
  }

  Check() {
    this.checked = true;
    return this.data.branch_code && this.data.counter_code;
  }

  get UploadUrl() {
    return this.data.record_upload_url || this.baseUploadURL;
  }

  get IsChecked() {
    return this.checked;
  }

  get EnableRecordTransaction() {
    var c = ProjectConfig.counter;
    return c.IsOn([this.data.record_transaction, c.record_transaction]);
  }

  get EnableLed() {
    return this.data.led_addr > 0;
  }

  private baseUploadURL = `${this.env.Platform.Http}/api/report/record/`;

  private checked = false;
}