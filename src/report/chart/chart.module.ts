import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { D3Module } from './d3/d3.module';
import { ReportChartComponent } from './chart.component';
import { I18n } from '../shared';


@NgModule({
    imports: [CommonModule, FormsModule, D3Module,I18n.TranslateModule],
    declarations: [ReportChartComponent],
    exports: [ReportChartComponent],
})
export class ReportChartModule { }