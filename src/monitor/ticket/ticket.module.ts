import { NgModule } from '@angular/core';
import { MonitorTicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MonitorTabModule } from '../tab/tab.module';
import { CTimeDatePipe, HourPipe } from './ticket.pipe';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorTicketComponent
    }
]);

@NgModule({
    imports: [routing, MonitorTabModule, CommonModule],
    declarations: [MonitorTicketComponent, CTimeDatePipe, HourPipe]
})
export class MonitorTicketModule { }