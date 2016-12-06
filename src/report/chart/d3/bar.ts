
import { AbstractChart, Item } from './chart';

import { timeDays } from 'd3-time';
import { timeParse, timeFormat } from 'd3-time-format';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { line } from 'd3-shape';

import { select, event, Selection } from 'd3-selection';
import 'd3-transition';
import { max, extent } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

const div = select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
const formatDate = timeFormat("%e %B");

const colors = scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

export class BarChart extends AbstractChart {
    render() {
        const data = this._data;
        const items = this.getItems();
        const svg = this.svg();
        const x = this.getXAxis();
        const y = this.getYAxis();
        const barWidth = x.bandwidth() / items.length;
        const height = this.mainHeight();
        const groups = svg.selectAll('.bar').data(items);
        const bars = groups.enter().append('g').attr('class', 'bar')
            .merge(groups)
            .selectAll('rect').data((i, j) => data.map(d => [x(d.time) + j * barWidth, y(d[i.field]), i.color]))
        bars.enter().append('rect')
            .merge(bars).attr('x', d => d[0])
            .attr('width', barWidth)
            .attr('y', d => d[1])
            .attr('height', 0)
            .transition().duration(500)
            .attr('height', d => height - <number>d[1])
            .attr('fill', d => d[2]);
        bars.exit().remove();
        groups.exit().transition().duration(300).attr('height', 0).remove();
    }

    getXAxis() {
        const x = scaleBand().range([0, this.mainWidth()]);
        x.domain(this._data.map(d => d.time));
        x.padding(0.2);
        this.svg().select('g.x.axis').attr('transform', `translate(0, ${this.mainHeight()})`).call(axisBottom(x))
            .selectAll('text').style('text-anchor', 'end')
            .attr('dx', '-.8em').attr('dy', '.15em').attr('transform', 'rotate(-65)');
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