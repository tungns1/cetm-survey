import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAPI } from './service/customer.service';
// import { TransactionHistoryApi } from '../history/history.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
    CustomerComponent
} from './customer.component';

import { Routes, RouterModule } from '@angular/router'
import { ReportFilterModule } from '../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: CustomerComponent
    }
]);

import { ServiceComponent } from './service-tab/service.component';
import { StoreComponent } from './store-tab/store.component';
import { FresComponent } from './fres-tab/fres.component';
import { TransactionTimeComponent } from './transaction-time/transaction-time.component';


import { CustomerFilterModule } from './filter/filter.module';
import { ReportSumModule } from './sum/sum.module';
import { ReportChartComponent } from './chart/chart.component';
import { ReportInfoModule } from './info/info.module'
import { ReportHistoryModule } from './history/history.module'
import { SharedModule, D3Module } from '../shared';

@NgModule({
    imports: [
        routing, D3Module,
        SharedModule, NgxChartsModule,
        ReportSumModule,
        ReportInfoModule, CustomerFilterModule, ReportHistoryModule,
        ReportFilterModule
    ],
    declarations: [
        CustomerComponent, ServiceComponent, StoreComponent, FresComponent, TransactionTimeComponent, ReportChartComponent
    ],
    providers: [CustomerAPI]
})
export class ReportCustomerModule {

}