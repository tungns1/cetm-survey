import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DashboardComponent
} from './dashboard.component';
import { SharedService } from '../../shared';

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: DashboardComponent
    }
]);


import { ReportSumModule } from '../sum/sum.module';
import { ReportOverviewModule } from '../overview/overview.module';
import { ReportChartModule } from '../chart/chart.module';
import { ReportTabModule } from '../tab/tab.module';

@NgModule({
    imports: [
        routing, ReportSumModule, ReportOverviewModule, ReportChartModule,
        ReportTabModule, CommonModule, SharedService.I18n.TranslateModule],
    declarations: [
        DashboardComponent
    ]
})
export class ReportDashboardModule {

}