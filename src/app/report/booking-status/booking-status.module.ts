import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingStatusComponent } from './booking-status.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportFilterModule, SharedModule } from '../shared';
import { StatusTableComponent } from './status-table/status-table.component';
import { AgGridModule } from 'ag-grid-angular';
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
    declarations: [BookingStatusComponent, StatusTableComponent]
})
export class BookingStatusModule { }
