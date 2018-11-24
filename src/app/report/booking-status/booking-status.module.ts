import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { BookingStatusComponent } from './booking-status.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportFilterModule, SharedModule } from '../shared';
import { StatusTableComponent } from './status-table/status-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { StatusSumComponent } from './status-sum/status-sum.component';
import { TimeDurationPipe } from '../../x/ng/time/timeDuration';
import { BookingService } from '../shared/service/booking-service.service';
const routing = [
    {
        path: '',
        component: BookingStatusComponent
    }
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
        AgGridModule.withComponents(StatusTableComponent),
    ],
    declarations: [BookingStatusComponent, StatusTableComponent, StatusSumComponent],
    providers:[TimeDurationPipe, BookingService, PercentPipe]
})
export class BookingStatusModule { }
