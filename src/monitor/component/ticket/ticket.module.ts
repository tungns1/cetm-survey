import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { FocusComponent } from './focus/focus.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedPipe } from '../../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent
    }
]);

import { MonitorTicketService } from './ticket.service';

@NgModule({
    imports: [
        routing, SharedModule, SharedPipe.UtilPipeModule
    ],
    providers: [
        MonitorTicketService
    ],
    declarations: [
        MonitorTicketComponent, FocusComponent, SummaryComponent]
})
export class MonitorTicketModule { }