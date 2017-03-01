import { NgModule } from '@angular/core';
import { I18n, SharedModule, SharedPipe, Ui, Ng } from '../../shared';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketHighlightDirective } from './ticket-highlight.directive';
import { FeedbackSkipDialog } from './feedback-skip.component';

@NgModule({
    imports: [
        SharedModule, Ng.TimeModule,
        SharedPipe.UtilPipeModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketHighlightDirective,
        FeedbackSkipDialog
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        Ng.TimeModule, SharedPipe.UtilPipeModule,
        FeedbackSkipDialog,
       TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog, FeedbackSkipDialog]
})
export class TicketModule { }