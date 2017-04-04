import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { FocusComponent } from './focus/focus.component';
import { TicketDetailComponent } from './focus/ticketDetail.component';
import { SummaryComponent } from './summary/summary.component';
import { MonitorChartComponent } from './chart/chart.component';
import { D3Module } from '../../../x/ng/d3/d3.module';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'summary' },
            { path: 'summary', component: SummaryComponent },
            { path: 'focus/:branch_id', component: FocusComponent }
        ]
    }
]);

import { monitorServiceProviders } from './shared';

@NgModule({
    imports: [
        routing, SharedModule, D3Module
    ],
    providers: [
        monitorServiceProviders
    ],
    declarations: [
        MonitorTicketComponent, FocusComponent,
        TicketDetailComponent,
        SummaryComponent, MonitorChartComponent
        ]
})
export class MonitorTicketModule { }