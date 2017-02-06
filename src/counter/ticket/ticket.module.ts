import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectCheckModule } from '../../x/ui/select/';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketTimerComopnent } from './timer.component';
import { ModalModule } from '../../x/ui/modal/';
import { TimeModule } from '../../x/ng/time/';
import { TicketHighlightDirective } from './ticket-highlight.directive';
import { I18n, SharedPipe } from '../shared';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        TimeModule, SelectCheckModule, ModalModule,
        I18n.TranslateModule, SharedPipe.UtilPipeModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    exports: [
        CommonModule, I18n.TranslateModule,
        TicketDetailDialog, TicketDetailDirective,
        TimeModule, SharedPipe.UtilPipeModule,
        TicketTimerComopnent, TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog]
})
export class TicketModule { }