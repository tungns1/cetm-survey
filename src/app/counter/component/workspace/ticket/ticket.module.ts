import { NgModule } from '@angular/core';
import { SharedModule, TimeModule } from '../../shared';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketHighlightDirective } from './ticket-highlight.directive';
import { FeedbackSkipDialog } from './feedback-skip.component';

@NgModule({
    imports: [
        SharedModule, TimeModule,
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketHighlightDirective,
        FeedbackSkipDialog
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        TimeModule,
        FeedbackSkipDialog,
        TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog, FeedbackSkipDialog]
})
export class TicketModule { }