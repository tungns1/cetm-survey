import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule, TimeModule } from '../shared';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketHighlightDirective } from './ticket-highlight.directive';
import { TicketIconComponent } from './ticket-icon.component';
import { FeedbackSkipDialog } from './feedback-skip.component';

@NgModule({
    imports: [
        SharedModule, TimeModule,
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketHighlightDirective,
        FeedbackSkipDialog,
        TicketIconComponent
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        TimeModule,
        FeedbackSkipDialog,
        TicketIconComponent,
        TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog, FeedbackSkipDialog]
})
export class TicketModule { }