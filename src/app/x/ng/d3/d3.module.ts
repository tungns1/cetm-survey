import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line';
import { BarChartComponent } from './bar';
import { PieChartComponent } from './pie';
import { StackChartComponent } from './stack';
import { ChartItemComponent, ChartItemGroup, ChartItemGroupView } from './chart-items.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        LineChartComponent, BarChartComponent, PieChartComponent, StackChartComponent,
        ChartItemComponent, ChartItemGroup, ChartItemGroupView
    ],
    exports: [
        LineChartComponent, BarChartComponent, PieChartComponent, StackChartComponent,
        ChartItemComponent, ChartItemGroup, ChartItemGroupView
    ]
})
export class D3Module {

}