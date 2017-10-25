import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting.component';
import { MissedComponent } from './missed.component';
import { CancelComponent } from './cancel.component';
import { TicketModule } from '../ticket/ticket.module';
import { SharedModule } from '../../../shared';

@NgModule({
    imports: [SharedModule, TicketModule],
    declarations: [WaitingComponent, MissedComponent, CancelComponent],
    exports: [WaitingComponent, MissedComponent, CancelComponent]
})
export class QueueModule { }