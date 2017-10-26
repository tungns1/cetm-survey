import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy, XWinMiniMode } from './shared';
import { RuntimeEnvironment, ICounterConfig, ProjectConfig } from './shared';

export interface ISuperCounterSetting {
  branch_code: string;
}

@Injectable()
export class SuperCounterSettingService extends SmallStorage<ISuperCounterSetting> {
  constructor(
    private xwinStorage: XWinStorageStrategy,
    private env: RuntimeEnvironment
  ) {
    super("superCounter", xwinStorage);
  }

  Update(data: ISuperCounterSetting) {
    const auth_update = this.data.branch_code !== data.branch_code;
    this.data.branch_code = data.branch_code;
    this.SaveData();
    return auth_update;
  }

  Check() {
    this.checked = true;
    return this.data.branch_code;
  }

  get UploadUrl() {
    return this.baseUploadURL;
  }

  get IsChecked() {
    return this.checked;
  }

  get EnableRecordTransaction() {
    var c = ProjectConfig.counter;
    return c.record_transaction === 'alway_on';
  }

  get EnableLed() {
    return true;
  }

  private baseUploadURL = `${this.env.Platform.Http}/api/report/record/`;

  private checked = false;
}