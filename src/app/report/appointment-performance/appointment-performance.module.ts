import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, PercentPipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule, ReportFilterModule, TimeModule } from '../shared';
import { AppointmentPerformanceComponent } from './appointment-performance.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppointmentService } from './shared/appointment.service';
import { AppointmentSumComponent } from './appointment-sum/appointment-sum.component';
import { TimeDurationPipe } from '../../x/ng/time/timeDuration';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
const routing = [
    {
        path: '',
        component: AppointmentPerformanceComponent
    },

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routing),
        MatTabsModule,
        FlexLayoutModule,
        NgxChartsModule,
        ReportFilterModule,
        SharedModule,
        AgGridModule.withComponents(AppointmentTableComponent),
        TimeModule
    ],
    declarations: [AppointmentPerformanceComponent, AppointmentSumComponent, AppointmentTableComponent],
    providers: [AppointmentService, DatePipe, PercentPipe, TimeDurationPipe,]
})
export class AppointmentPerformanceModule { }
