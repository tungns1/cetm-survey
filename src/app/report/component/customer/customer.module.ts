import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CustomerAPI } from './service/customer.service';

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

import { ReportFilterModule } from './filter/filter.module';
import { ReportSumModule } from './sum/sum.module';
import { ReportOverviewModule } from './overview/overview.module';
import { ReportChartModule } from './chart/chart.module';
import { ReportTabComponent } from './tab/tab.component';
import { ReportInfoModule } from './info/info.module'
import { ReportHistoryModule } from './history/history.module'

@NgModule({
    imports: [
        routing, ReportSumModule, ReportOverviewModule, ReportChartModule, 
        ReportInfoModule, ReportFilterModule, ReportHistoryModule,
        CommonModule, SharedService.I18n.TranslateModule, FlexLayoutModule],
    declarations: [
        CustomerComponent, ReportTabComponent
    ],
    providers: [CustomerAPI],
    exports: [FlexLayoutModule]
})
export class ReportCustomerModule {

}