import { NgModule } from '@angular/core';
import { D3Module } from '../../../x/ng/d3/d3.module';
import { MonitorChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { SharedModule } from '../../shared';


@NgModule({
    imports: [SharedModule, D3Module],
    declarations: [MonitorChartComponent],
    providers: [ChartService],
    exports: [MonitorChartComponent],
})
export class MonitorChartModule { }