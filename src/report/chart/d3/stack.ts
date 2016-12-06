
import { AbstractChart, Item } from './chart';

import { timeDays } from 'd3-time';
import { timeParse, timeFormat } from 'd3-time-format';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { line, stack } from 'd3-shape';

import { select, event, Selection } from 'd3-selection';
import 'd3-transition';
import { max, extent, sum } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

const div = select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
const formatDate = timeFormat("%e %B");

export class StackChart extends AbstractChart {
    render() {
        const data = this._data;
        const items = this.getItems();
        const svg = this.svg();
        const x = this.getXAxis();
        const y = this.getYAxis();
        const height = this.mainHeight();
        const fields = items.map(i => i.field);

        const colors = scaleOrdinal().range(items.map(i => i.color));
        colors.domain(fields);

        const layers = svg.selectAll('.layer').data(stack().keys(fields)(data));
        const bars = layers.enter().append('g')
            .attr('class', 'layer')
            .merge(layers)
            .attr('fill', (d, i) => <any>colors(d['key']))
            .selectAll('rect').data(d => <any>d);
        bars.enter().append('rect').merge(bars)
            .attr('x', d => x(d['data']['time']))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d[1]))
            .attr('height', 0)
            .transition().duration(500)
            .attr('height', d => y(d[0]) - y(d[1]));
        bars.exit().remove();
        layers.exit().transition().duration(300).attr('height', 0).remove();
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
            return sum(items, i => d[i.field]);
        })]);
        y.nice();
        this.svg().select('g.y1.axis').call(axisLeft(y));
        return y;
    }

}

import { Component, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartComponent } from './chart';

@Component({
    selector: '[stack-chart]',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: [...ChartComponent.inputs]
})
export class StackChartComponent extends ChartComponent<StackChart> {
    constructor(el: ElementRef) {
        super(el);
    }

    make = (el) => new StackChart(el);

}