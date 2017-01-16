import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting.component';
import { MissedComponent } from './missed.component';
import { TicketModule } from '../ticket/ticket.module';
import { I18n } from '../../shared';

@NgModule({
    imports: [CommonModule, TicketModule,I18n.TranslateModule],
    declarations: [WaitingComponent, MissedComponent],
    exports: [WaitingComponent, MissedComponent]
})
export class QueueModule { }