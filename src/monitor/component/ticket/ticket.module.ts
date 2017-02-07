import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { I18n } from '../../shared';
import { FocusComponent } from './focus/focus.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedPipe } from '../../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent,
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'summary/all'
        }, {
            path: 'summary',
            pathMatch: 'full',
            redirectTo: 'summary/all'
        },
        {
            path: 'focus/:branch_id',
            component: FocusComponent
        }, {
            path: 'summary/:branches',
            component: SummaryComponent
        }]
    }
]);

import { MonitorTicketService } from './ticket.service';
import { Reducers } from './reducers';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        routing, CommonModule,
        I18n.TranslateModule, SharedPipe.UtilPipeModule,
        StoreModule.provideStore(Reducers)
    ],
    providers: [
        MonitorTicketService
    ],
    declarations: [
        MonitorTicketComponent, FocusComponent, SummaryComponent]
})
export class MonitorTicketModule { }