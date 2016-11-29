import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting.component';
import { MissedComponent } from './missed.component';
import { TicketModule } from '../ticket/ticket.module';

@NgModule({
    imports: [CommonModule, TicketModule],
    declarations: [WaitingComponent, MissedComponent],
    exports: [WaitingComponent, MissedComponent]
})
export class QueueModule { }