import { NgModule } from '@angular/core';
import { ReportChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { SharedModule, D3Module } from '../../shared';

@NgModule({
    imports: [SharedModule, D3Module],
    declarations: [
        ReportChartComponent
    ],
    providers: [ChartService],
    exports: [
        ReportChartComponent
    ],
})
export class DashboardChartModule { }