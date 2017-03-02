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


import { ReportSumModule } from './sum/sum.module';
import { ReportOverviewModule } from './overview/overview.module';
import { ReportChartModule } from './chart/chart.module';
import { ReportTabComponent } from './tab/tab.component';
import {} from '@angular/flex-layout';

@NgModule({
    imports: [
        routing, ReportSumModule, ReportOverviewModule, ReportChartModule,
        CommonModule, SharedService.I18n.TranslateModule],
    declarations: [
        DashboardComponent, ReportTabComponent
    ]
})
export class ReportDashboardModule {

}