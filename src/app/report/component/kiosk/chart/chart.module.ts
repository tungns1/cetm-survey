import { NgModule } from '@angular/core';
import { D3Module } from '../../../../x/ng/d3/d3.module';
import { ReportChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import {TicketChartComponent} from './ticket.component';
import {TimeChartComponent} from './time.component';
import { SharedModule } from '../../shared';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
    imports: [SharedModule, D3Module,NgxChartsModule],
    declarations: [ReportChartComponent,TimeChartComponent,TicketChartComponent],
    providers: [ChartService],
    exports: [ReportChartComponent],
})
export class ReportChartModule { }