import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectCheckModule } from '../../x/ui/select/';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { HourPipe } from './dialog.pipe';
import { TicketServiceNamePipe, TicketHourPipe, TicketDurationPipe } from './ticket.pipe';
import { TicketTimerComopnent } from './timer.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectCheckModule],
    declarations: [
        TicketDetailDialog, TicketDetailDirective, TicketServiceNamePipe,
        TicketHourPipe, HourPipe, TicketDurationPipe,
        TicketTimerComopnent
    ],
    exports: [
        TicketDetailDialog, TicketDetailDirective, TicketServiceNamePipe,
        TicketHourPipe, TicketDurationPipe,
        TicketTimerComopnent
    ],
    entryComponents: [TicketDetailDialog]
})
export class TicketModule { }