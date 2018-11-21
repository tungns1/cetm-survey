import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './timeline.component';
import { TimelineContentComponent } from './timeline-content/timeline-content.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReportFilterModule } from '../dashboard/shared/index';
import { TimelineReportService } from '../shared/service/timelineReport.service';
import { AgGridModule } from 'ag-grid-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
const routing = RouterModule.forChild([
  {
    path: '',
    component: TimelineComponent
  }
]);
@NgModule({
  imports: [
    CommonModule, routing, SharedModule,
    ReportFilterModule, NgxChartsModule, HttpClientModule,
    AgGridModule.withComponents([
      TimelineComponent
    ])
  ],
  providers: [TimelineReportService],

  declarations: [TimelineComponent, TimelineContentComponent]
})
export class TimelineModule { }
