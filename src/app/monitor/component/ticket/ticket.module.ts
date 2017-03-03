import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { FocusComponent } from './focus/focus.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedPipe } from '../../shared';
import { MonitorChartComponent } from './chart/chart.component';
import { D3Module } from '../../../x/ng/d3/d3.module';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent
    }
]);

import { MonitorTicketService } from './ticket.service';

@NgModule({
    imports: [
        routing, SharedModule, SharedPipe.UtilPipeModule, D3Module
    ],
    providers: [
        MonitorTicketService
    ],
    declarations: [
        MonitorTicketComponent, FocusComponent, 
        SummaryComponent, MonitorChartComponent]
})
export class MonitorTicketModule { }