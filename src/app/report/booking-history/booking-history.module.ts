import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BookingHistoryComponent } from './booking-history.component';
import { RouterModule } from '@angular/router';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule, ReportFilterModule } from '../shared';
import { BookingService } from '../shared/service/booking-service.service';

const routing = [
    {
        path: '',
        component: BookingHistoryComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routing),
        AgGridModule.withComponents(BookingHistoryComponent),
        FlexLayoutModule,
        SharedModule, 
        ReportFilterModule
    ],
    declarations: [BookingHistoryComponent, BookingTableComponent],
    providers: [BookingService, AsyncPipe]
})
export class BookingHistoryModule { }
