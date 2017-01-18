import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line';
import { BarChartComponent } from './bar';
import { PieChartComponent } from './pie';
import { StackChartComponent } from './stack';
import { I18n } from '../../shared';
@NgModule({
    imports: [CommonModule,I18n.TranslateModule],
    declarations: [LineChartComponent, BarChartComponent, PieChartComponent, StackChartComponent],
    exports: [LineChartComponent, BarChartComponent, PieChartComponent, StackChartComponent]
})
export class D3Module {

}