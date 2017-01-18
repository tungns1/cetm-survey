import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MonitorTabModule } from '../shared';
import { CTimeDatePipe, HourPipe } from './ticket.pipe';
import { I18n } from '../shared';
const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent
    }
]);

@NgModule({
    imports: [routing, MonitorTabModule, CommonModule,I18n.TranslateModule],
    declarations: [MonitorTicketComponent, CTimeDatePipe, HourPipe]
})
export class MonitorTicketModule { }