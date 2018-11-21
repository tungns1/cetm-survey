import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from "ag-grid-angular/main";
import { MatCheckboxModule } from '@angular/material';

import { SharedModule, ReportFilterModule, SurveyReportService } from "../shared";

import { SurveyHistoryComponent } from './survey-history.component';
import { SurveyHistoryModalComponent } from './survey-history-modal/survey-history-modal.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: SurveyHistoryComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing, HttpClientModule,
    SharedModule, ReportFilterModule, MatCheckboxModule,
    AgGridModule.withComponents([
      SurveyHistoryComponent,
      SurveyHistoryModalComponent
    ])
  ],
  declarations: [SurveyHistoryComponent, SurveyHistoryModalComponent],
  providers: [SurveyReportService, DatePipe],
  entryComponents: [
    SurveyHistoryModalComponent
  ]
})
export class SurveyHistoryModule { }
