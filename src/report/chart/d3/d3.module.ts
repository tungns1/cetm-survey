import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line';
import { BarChartComponent } from './bar';
import { PieChartComponent } from './pie';
import { StackChartComponent } from './stack';
@NgModule({
    imports: [CommonModule],
    declarations: [LineChartComponent, BarChartComponent, PieChartComponent, StackChartComponent],
    exports: [LineChartComponent, BarChartComponent, PieChartComponent, StackChartComponent]
})
export class D3Module {

}