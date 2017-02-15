import { NgModule } from '@angular/core';
import { I18n, SharedModule, SharedPipe, Ui, Ng } from '../../shared';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketTimerComopnent } from './timer.component';
import { TicketHighlightDirective } from './ticket-highlight.directive';

@NgModule({
    imports: [
        SharedModule, Ng.TimeModule,
        SharedPipe.UtilPipeModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        Ng.TimeModule, SharedPipe.UtilPipeModule,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog]
})
export class TicketModule { }