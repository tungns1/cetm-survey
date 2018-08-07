import { Injectable } from '@angular/core';
import { WorkspaceSettingService } from './counter-setting.service';
import {
  LedService, FeedbackService, RecorderService,
  WorkspaceService
} from './service';
import { LauncherService } from './device';
import { LoadConfig } from '../../../../init';

@Injectable()
export class ComposeService {

  constructor(
    private ledService: LedService,
    private feedbackService: FeedbackService,
    private recorderService: RecorderService,
    private workspaceService: WorkspaceService,
    private counterSetting: WorkspaceSettingService,
    private launcherService: LauncherService
  ) { }

  enable() {
    LoadConfig()
    const setting = this.counterSetting.Data;
    if (this.counterSetting.EnableLed) {
      this.ledService.enable(setting.led_addr, setting.led_remote, setting.led_com_port);
    }
    this.feedbackService.enable();
    if (this.counterSetting.EnableRecordTransaction) {
      this.recorderService.enable();
    }
    this.workspaceService.enable();
    if (setting.mini_mode && setting.mini_mode.enable) {
      this.launcherService.SetMiniMode(setting.mini_mode);
    }

  }

  disable() {
    this.workspaceService.disable();
  }
}
