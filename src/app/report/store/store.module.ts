import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreAPI } from './service/store.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HourComponent } from './store-hour/hour.component';
import { PerformanceComponent } from './store-performance/performance.component';
import { SharedModule } from '../shared';
import { ReportFilterModule } from "../shared";

import {
    StoreComponent
} from './store.component';

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: StoreComponent
    }
]);

@NgModule({
    imports: [
        routing, NgxChartsModule,
        SharedModule, ReportFilterModule
    ],
    declarations: [
        StoreComponent, HourComponent, PerformanceComponent
    ],
    providers: [StoreAPI]
})
export class ReportStoreModule {

}