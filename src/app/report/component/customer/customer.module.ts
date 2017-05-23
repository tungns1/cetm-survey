import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAPI } from './service/customer.service';
import { TransactionHistoryApi } from '../history/history.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ReportFilterModule } from "../../filter/filter.module";
import {
    CustomerComponent
} from './customer.component';

import { Routes, RouterModule } from '@angular/router'

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
import { D3Module } from '../../../x/ng/d3/d3.module';
import { ReportChartComponent } from './chart/chart.component';
import { ReportInfoModule } from './info/info.module'
import { ReportHistoryModule } from './history/history.module'
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        routing, ReportSumModule,
        ReportInfoModule, CustomerFilterModule, ReportHistoryModule,
        SharedModule,NgxChartsModule,D3Module,ReportFilterModule
    ],
    declarations: [
        CustomerComponent,ServiceComponent,StoreComponent,FresComponent,TransactionTimeComponent,ReportChartComponent
    ],
    providers: [CustomerAPI, TransactionHistoryApi]
})
export class ReportCustomerModule {

}