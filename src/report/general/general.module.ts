import { NgModule } from '@angular/core';
import {
    GeneralComponent
} from './general.component';

import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: GeneralComponent
    }
]);


import { ReportSumModule } from '../sum/sum.module';
import { ReportOverviewModule } from '../overview/overview.module';
import { ReportChartModule } from '../chart/chart.module';
import { ReportTabModule } from '../tab/tab.module';

@NgModule({
    imports: [routing, ReportSumModule, ReportOverviewModule, ReportChartModule, ReportTabModule],
    declarations: [
        GeneralComponent
    ]
})
export class ReportGeneralModule {

}