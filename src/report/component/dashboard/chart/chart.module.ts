import { NgModule } from '@angular/core';
import { D3Module } from './d3/d3.module';
import { ReportChartComponent } from './chart.component';
import { SharedModule } from '../../shared';


@NgModule({
    imports: [SharedModule, D3Module],
    declarations: [ReportChartComponent],
    exports: [ReportChartComponent],
})
export class ReportChartModule { }