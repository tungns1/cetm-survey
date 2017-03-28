import { NgModule } from '@angular/core';
import { D3Module } from '../../../../x/ng/d3/d3.module';
import { TopFiveChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { TicketChartComponent } from './ticket.component';
import { TimeChartComponent } from './time.component';
import { SharedModule } from '../../shared';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [SharedModule, D3Module, NgxChartsModule],
    declarations: [TopFiveChartComponent, TimeChartComponent, TicketChartComponent],
    providers: [ChartService],
    exports: [TopFiveChartComponent],
})
export class TopFiveChartModule { }