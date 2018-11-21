import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MonitorSummaryService } from './shared/monitor-survey.service';
import { FeedbackSurveyService } from '../../../admin/service';
import { map } from 'rxjs/operators';

@Injectable()
export class MonitorSurveyGuard implements CanActivate {
    constructor(
        private feedbackSurveyService: FeedbackSurveyService,
        private monitorSummaryService: MonitorSummaryService,
    ) { }

    canActivate() {
        return this.feedbackSurveyService.GetFeedbackUI().pipe(map(data => {
            this.monitorSummaryService.FeedbackConfig = data;
            return true
        }))
    }
} 
