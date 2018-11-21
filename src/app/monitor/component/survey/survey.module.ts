import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { routing } from './survey.routing';
import { SharedModule } from '../../shared';
import { MonitorSurveyGuard } from './survey.guard';
import { MonitorSurveySocket } from './shared/monitor-survey.socket';
import { MonitorSummaryService } from './shared/monitor-survey.service';
import { FeedbackSurveyService } from '../../../admin/service';

import { SurveyComponent } from './survey.component';
import { SummaryComponent } from './summary/summary.component';
import { DetailComponent } from './detail/detail.component';
import { PoorFeedbackModalComponent } from './poor-feedback-modal/poor-feedback-modal.component';
import { AccordionModule } from '../../../report/shared';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
@NgModule({
  imports: [
    CommonModule, routing, SharedModule,
    MatProgressSpinnerModule, AccordionModule,
    AgGridModule.withComponents([SummaryComponent, FeedbackListComponent]),
    NgxChartsModule, HttpClientModule
  ],
  exports: [SurveyComponent],
  declarations: [
    SurveyComponent, SummaryComponent, DetailComponent,
    PoorFeedbackModalComponent, FeedbackListComponent
  ],
  providers: [
    MonitorSurveySocket, MonitorSummaryService, FeedbackSurveyService,
    MonitorSurveyGuard
  ],
  entryComponents: [PoorFeedbackModalComponent]
})
export class SurveyModule { }
