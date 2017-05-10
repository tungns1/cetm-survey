import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule, TimeModule } from '../shared';
import { TicketDetailDialog, ConfirmDialog, Alert } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketHighlightDirective } from './ticket-highlight.directive';
import { FeedbackSkipDialog } from './feedback-skip.component';

@NgModule({
    imports: [
        SharedModule, TimeModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketHighlightDirective, ConfirmDialog,
        FeedbackSkipDialog, Alert
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        TimeModule, ConfirmDialog,
        FeedbackSkipDialog, Alert,
        TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog, ConfirmDialog, Alert, FeedbackSkipDialog]
})
export class TicketModule { }