import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { D3Module } from './d3/d3.module';
import { ReportChartComponent } from './chart.component';


@NgModule({
    imports: [CommonModule, FormsModule, D3Module],
    declarations: [ReportChartComponent],
    exports: [ReportChartComponent],
})
export class ReportChartModule { }