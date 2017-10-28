import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { 
    SharedModule, TimeModule
} from '../shared';
import { TicketDetailDialog } from './ticket-detail.dialog';
import { TicketDetailDirective } from './ticket-detail.directive';
import { TicketHighlightDirective } from './ticket-highlight.directive';

@NgModule({
    imports: [
        SharedModule, TimeModule
    ],
    declarations: [
        TicketDetailDialog, TicketDetailDirective,
        TicketHighlightDirective,
    ],
    exports: [
        SharedModule,
        TicketDetailDialog, TicketDetailDirective,
        TimeModule,
        TicketHighlightDirective
    ],
    entryComponents: [TicketDetailDialog]
})
export class TicketModule { }