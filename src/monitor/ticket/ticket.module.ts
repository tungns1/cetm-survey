import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MonitorTabModule } from '../shared';
import { I18n } from '../shared';
import { FocusComponent } from './focus/focus.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedPipe } from '../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent,
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'summary'
        },
        {
            path: 'focus/:branch_id',
            component: FocusComponent
        }, {
            path: 'summary',
            component: SummaryComponent
        }]
    }
]);


@NgModule({
    imports: [
        routing, MonitorTabModule, CommonModule,
        I18n.TranslateModule, SharedPipe.UtilPipeModule],
    declarations: [
        MonitorTicketComponent, FocusComponent, SummaryComponent]
})
export class MonitorTicketModule { }