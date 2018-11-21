import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from "ag-grid-angular/main";

import { SharedModule, ReportFilterModule, SurveyReportService } from "../shared";

import { SurveyAnalysisComponent } from './survey-analysis.component';
import { SurveyAnalysisDetailComponent } from './survey-analysis-detail/survey-analysis-detail.component';
import { SumInfoComponent } from './survey-analysis-detail/sum-info/sum-info.component';
import { SurveyDetailComponent } from './survey-analysis-detail/survey-detail/survey-detail.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: SurveyAnalysisComponent
  },
  {
    path: 'surveyAnalysisDetail/:survey',
    component: SurveyAnalysisDetailComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing, NgxChartsModule,
    SharedModule, ReportFilterModule, HttpClientModule,

    AgGridModule.withComponents([
      SurveyAnalysisComponent,
      SurveyAnalysisDetailComponent
    ])
  ],
  declarations: [SurveyAnalysisComponent, SurveyAnalysisDetailComponent, SumInfoComponent, SurveyDetailComponent],
  providers: [SurveyReportService, DatePipe]
})
export class SurveyAnalysisModule { }