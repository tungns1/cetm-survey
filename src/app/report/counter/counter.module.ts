import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CounterAPI } from './service/counter.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportFilterModule } from "../shared";

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
        routing, NgxChartsModule,
        SharedModule, ReportFilterModule
    ],
    declarations: [
        CounterComponent, ActivityComponent, PerformanceComponent
    ],
    providers: [CounterAPI]
})
export class ReportCounterModule {

}