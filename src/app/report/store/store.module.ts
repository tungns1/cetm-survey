import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTabsModule } from '@angular/material';
import { StoreAPI } from './service/store.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HourComponent } from './store-hour/hour.component';
import { PerformanceComponent } from './store-performance/performance.component';
import { SharedModule } from '../shared';
import { ReportFilterModule } from "../shared";
import { AgGridModule } from "ag-grid-angular/main";

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
        routing, NgxChartsModule, MatTabsModule,
        SharedModule, ReportFilterModule,
        AgGridModule.withComponents([])
    ],
    declarations: [
        StoreComponent, HourComponent, PerformanceComponent
    ],
    providers: [StoreAPI]
})
export class ReportStoreModule {

}