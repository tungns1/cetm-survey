import { Injectable } from '@angular/core';
import { CounterSettingService } from './shared';
import { LedService } from './led.service';
import { FeedbackService } from './feedback.service';
import { RecorderService } from './recorder.service';
import { WorkspaceService } from './workspace.service';
import { LauncherService } from '../device';
import { MinimizeRatio } from '../shared/const';

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
    this.ledService.enable();
    this.feedbackService.enable();
    if (this.counterSetting.Data.enable_recording) {
      this.recorderService.enable();
    }
    this.workspaceService.enable();
    this.launcherService.SetMiniMode(MinimizeRatio);
  }

  disable() {
    this.workspaceService.disable();
  }

}