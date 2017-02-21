import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    CustomerComponent
} from './customer.component';
import { SharedService } from '../../shared';

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: CustomerComponent
    }
]);


import { ReportSumModule } from './sum/sum.module';
import { ReportOverviewModule } from './overview/overview.module';
import { ReportChartModule } from './chart/chart.module';
import { ReportTabComponent } from './tab/tab.component';

@NgModule({
    imports: [
        routing, ReportSumModule, ReportOverviewModule, ReportChartModule,
        CommonModule, SharedService.I18n.TranslateModule],
    declarations: [
        CustomerComponent, ReportTabComponent
    ]
})
export class ReportCustomerModule {

}