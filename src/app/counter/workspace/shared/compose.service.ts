import { Injectable } from '@angular/core';
import { CounterSettingService } from './shared';
import {
  LedService, FeedbackService, RecorderService,
  WorkspaceService
} from './service';
import { LauncherService } from './device';

@Injectable()
export class ComposeService {

  constructor(
    private ledService: LedService,
    private feedbackService: FeedbackService,
    private recorderService: RecorderService,
    private workspaceService: WorkspaceService,
    private counterSetting: CounterSettingService,
    private launcherService: LauncherService
  ) { }

  enable() {
    const setting = this.counterSetting.Data;
    this.ledService.enable(setting.led_com_port, setting.led_addr);
    this.feedbackService.enable();
    if (setting.enable_recording) {
      this.recorderService.enable();
    }
    this.workspaceService.enable();
    if (setting.mini_mode.enable) {
      this.launcherService.SetMiniMode(setting.mini_mode);
    }

  }

  disable() {
    this.workspaceService.disable();
  }
}
