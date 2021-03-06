import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTabsModule } from '@angular/material'
import { CounterAPI } from './service/counter.service';
import { ReportFilterModule } from "../shared";
import { AgGridModule } from "ag-grid-angular/main";

import {
    CounterComponent
} from './counter.component';

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: CounterComponent
    }
]);
import { ActivityComponent } from './counter-activity/activity.component';
import { PerformanceComponent } from './counter-performance/performance.component';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        routing, NgxChartsModule, MatTabsModule,
        SharedModule, ReportFilterModule,
        AgGridModule.withComponents([])
    ],
    declarations: [
        CounterComponent, ActivityComponent, PerformanceComponent
    ],
    providers: [CounterAPI]
})
export class ReportCounterModule {

}