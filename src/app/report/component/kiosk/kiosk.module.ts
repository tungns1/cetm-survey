import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { KioskAPI } from './service/kiosk.service';
import { ReportTabComponent } from './tab/tab.component';

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

import { ReportOverviewModule } from './overview/overview.module';
import { ReportInfoModule } from './info/info.module'
import { ReportChartModule } from './chart/chart.module';
import { TopFiveChartModule } from './topfive/chart.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        routing, ReportOverviewModule,
        ReportInfoModule,ReportChartModule,TopFiveChartModule,
        SharedModule
    ],
    declarations: [
        KioskComponent,ReportTabComponent
    ],
    providers: [KioskAPI]
})
export class ReportKioskModule {

}