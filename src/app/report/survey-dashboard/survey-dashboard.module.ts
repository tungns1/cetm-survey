import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from "ag-grid-angular/main";

import { SharedModule, ReportFilterModule, SurveyReportService } from "../shared";

import { SurveyDashboardComponent } from './survey-dashboard.component';
import { SummaryInfoComponent } from './summary-info/summary-info.component';
import { SurveyChartComponent } from './survey-chart/survey-chart.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: SurveyDashboardComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, routing, NgxChartsModule,
    SharedModule, ReportFilterModule, MatTabsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      SurveyDashboardComponent,
    ])
  ],
  declarations: [SurveyDashboardComponent, SummaryInfoComponent, SurveyChartComponent],
  providers: [SurveyReportService]
})
export class SurveyDashboardModule { }
