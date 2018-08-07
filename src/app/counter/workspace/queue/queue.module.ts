import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting.component';
import { MissedComponent } from './missed.component';
import { CancelComponent } from './cancel.component';
import { BookingListComponent } from './bookingList.component';
import { TicketModule } from '../ticket/ticket.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule, TicketModule
    ],
    declarations: [
        WaitingComponent, MissedComponent, CancelComponent,
        BookingListComponent
    ],
    exports: [
        WaitingComponent, MissedComponent, CancelComponent,
        BookingListComponent
    ]
})
export class QueueModule { }