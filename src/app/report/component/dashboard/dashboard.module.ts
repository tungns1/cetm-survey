import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared';

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

@NgModule({
    imports: [
        CommonModule, SharedModule, routing,
        ReportSumModule, ReportOverviewModule, ReportChartModule
    ],
    declarations: [
        DashboardComponent, ReportTabComponent
    ]
})
export class ReportDashboardModule {
}