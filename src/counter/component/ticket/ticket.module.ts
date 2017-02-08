import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18n, SharedModule, SharedPipe, Ui, Ng, SelectCheckModule } from '../../shared';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketTimerComopnent } from './timer.component';
import { TicketHighlightDirective } from './ticket-highlight.directive';

@NgModule({
    imports: [
        SharedModule, Ng.Time.TimeModule, SelectCheckModule,
        Ng.Modal.ModalModule, SharedPipe.UtilPipeModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        Ng.Time.TimeModule, SharedPipe.UtilPipeModule,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog]
})
export class TicketModule { }