
import { AbstractChart, Item } from './chart';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { max, extent } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

const colors = scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

export class BarChart extends AbstractChart {
    private barWidth = 1;
    render() {
        const data = this._data;
        if (data.length < 1) {
            return;
        }
        const items = this.getItems();
        const svg = this.svg();
        const x = this.getXAxis();
        const y = this.getYAxis();
        const group = scaleBand().rangeRound([0, x.bandwidth()]).padding(0.06);
        group.domain(items.map((i, index) => i.field));
        const height = this.mainHeight();
        const groups = svg.selectAll('.bar').data(items);
        const bars = groups.enter().append('g').attr('class', 'bar')
            .merge(groups)
            .selectAll('rect').data(i => data.map(d => [x(this.dateFormat(d.date)) + group(i.field), y(d[i.field]), i.color]))
        bars.enter().append('rect')
            .merge(bars).attr('x', d => d[0])
            .attr('width', group.bandwidth())
            .attr('y', d => d[1])
            .attr('height', 0)
            .transition().duration(500)
            .attr('height', d => height - <number>d[1])
            .attr('fill', d => d[2]);
        bars.exit().remove();
        groups.exit().transition().duration(300).attr('height', 0).remove();
    }

    getXAxis() {
        const min = this._extents[0];
        const max = this._extents[1];
        const x = scaleBand().range([0, this.mainWidth()]);
        const range = this.interval.range(min, max, 1);
        // inclusive
        range.push(max);
        x.domain(range.map(this.dateFormat));
        x.padding(0.2);
        const values = this.tickValues().map(this.dateFormat) ;
        const axis = this.selectXAxis().call(axisBottom(x).tickValues(values));
        const barWidth = x.bandwidth();
        return x;
    }

    getYAxis() {
        const y = scaleLinear().rangeRound([this.mainHeight(), 0]);
        const items = this.getItems();
        y.domain([0, max(this._data, d => {
            return max(items, i => d[i.field]);
        })]);
        this.svg().select('g.y1.axis').call(axisLeft(y));
        return y;
    }

}

import { Component, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartComponent } from './chart';

@Component({
    selector: '[bar-chart]',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: [...ChartComponent.inputs]
})
export class BarChartComponent extends ChartComponent<BarChart> {
    constructor(el: ElementRef) {
        super(el);
    }

    make = (el) => new BarChart(el);

}