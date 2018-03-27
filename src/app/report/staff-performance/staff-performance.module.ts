import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule, ReportFilterModule } from '../shared';
import { StaffPerformanceService } from './shared/staff-performance.service';
import { TimeDurationPipe } from '../../x/ng/time/timeDuration';
import { StaffPerformanceComponent } from './staff-performance.component';
import { StaffSumComponent } from './staff-sum/staff-sum.component';
import { StaffTableComponent } from './staff-table/staff-table.component';


const routing = RouterModule.forChild([
  {
    path: '',
    component: StaffPerformanceComponent
  }
]);

@NgModule({
  imports: [
    CommonModule, SharedModule, ReportFilterModule,
    routing, MatProgressSpinnerModule,

    AgGridModule.withComponents([StaffTableComponent])
  ],
  declarations: [StaffPerformanceComponent, StaffSumComponent, StaffTableComponent],
  providers: [StaffPerformanceService, DatePipe, TimeDurationPipe]
})
export class StaffPerformanceModule { }
