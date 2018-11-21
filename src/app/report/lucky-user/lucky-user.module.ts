import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LuckyUserComponent } from './lucky-user.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule, ReportFilterModule } from '../shared';
import { LuckyUserReportService } from '../shared/service/lucky-user-report.service';
import { HttpClientModule } from '@angular/common/http';

const routing = RouterModule.forChild([
    {
      path: '',
      component: LuckyUserComponent
    }
  ]);
@NgModule({
  imports: [
    CommonModule, routing, SharedModule, ReportFilterModule, HttpClientModule,
    AgGridModule.withComponents([
        LuckyUserComponent
      ]),
  ],
  declarations: [LuckyUserComponent],
  providers: [LuckyUserReportService, DatePipe]
})
export class LuckyUserModule { }
