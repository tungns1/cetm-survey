import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { KioskAPI } from './service/kiosk.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTabsModule } from '@angular/material';
import { ReportFilterModule } from "../shared";
import { AgGridModule } from "ag-grid-angular/main";

import {
    KioskComponent
} from './kiosk.component';

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: KioskComponent
    }
]);
import { TicketComponent } from './ticket-tab/ticket.component';
import { TimeComponent } from './time-tab/time.component';
import { ReportInfoModule } from './info/info.module'
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        routing, NgxChartsModule,
        ReportInfoModule, MatTabsModule,
        SharedModule, ReportFilterModule,
        AgGridModule.withComponents([])
    ],
    declarations: [
        KioskComponent, TicketComponent, TimeComponent
    ],
    providers: [KioskAPI]
})
export class ReportKioskModule {

}