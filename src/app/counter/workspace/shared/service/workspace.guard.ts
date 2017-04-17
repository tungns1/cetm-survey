import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CounterSettingService } from './shared';
import { LedService } from './led.service';
import { FeedbackService } from './feedback.service';
import { RecorderService } from './recorder.service';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(
    private ledService: LedService,
    private feedbackService: FeedbackService,
    private recorderService: RecorderService,
    private counterSetting: CounterSettingService
  ) {

  }

  enableService() {
    this.ledService.enable();
    this.feedbackService.enable();
    if (this.counterSetting.Data.enable_recording) {
      this.recorderService.enable();
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.enableService();
    return true;
  }
}
