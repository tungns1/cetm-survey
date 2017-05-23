import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared';
import { ReportFilterModule } from "../filter/filter.module";

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: DashboardComponent
    }
]);


import { ReportSumModule } from './sum/sum.module';
import { AggregateService } from './shared';
import { TransactionTimeComponent } from './transaction-time/transaction-time.component';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { GeneralViewComponent } from './general-view/general-view.component';
import { DashboardSharedModule } from './shared';
import { DashboardChartModule } from './chart/chart.module';

@NgModule({
    imports: [
        CommonModule, SharedModule, routing, DashboardSharedModule,
        ReportSumModule, DashboardChartModule,ReportFilterModule
    ],
    declarations: [
        DashboardComponent, TransactionTimeComponent, CustomerFeedbackComponent, GeneralViewComponent
    ],
    providers: [AggregateService]
})
export class ReportDashboardModule {
}