import { NgModule } from '@angular/core';
import { D3Module } from '../../../../x/ng/d3/d3.module';
import { ReportChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { SharedModule } from '../../shared';


@NgModule({
    imports: [SharedModule, D3Module],
    declarations: [ReportChartComponent],
    providers: [ChartService],
    exports: [ReportChartComponent],
})
export class ReportChartModule { }