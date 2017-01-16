import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectCheckModule } from '../../x/ui/select/';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { HourPipe } from './dialog.pipe';
import { TicketServiceNamePipe, TicketHourPipe, TicketDurationPipe } from './ticket.pipe';
import { TicketTimerComopnent } from './timer.component';
import { ModalModule } from '../../x/ui/modal/';
import { TicketHighlightDirective } from './ticket-highlight.directive';
import { I18n } from '../shared';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        SelectCheckModule, ModalModule, I18n.TranslateModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective, TicketServiceNamePipe,
        TicketHourPipe, HourPipe, TicketDurationPipe,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    exports: [
        CommonModule, I18n.TranslateModule,
        TicketDetailDialog, TicketDetailDirective, TicketServiceNamePipe,
        TicketHourPipe, TicketDurationPipe,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog]
})
export class TicketModule { }