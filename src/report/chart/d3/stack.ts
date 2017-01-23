
import { AbstractChart, Item } from './chart';

import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { line, stack } from 'd3-shape';

import { max, extent, sum } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

export class StackChart extends AbstractChart {
    private barWidth = 1;

    render() {
        const data = this._data;
        if (data.length < 1) {
            return;
        }
        const items = this.getItems();
        const svg = this.svg();
        const x = this.getXAxis();
        if (data.length < 3) {
            x.padding(0.7);
        } else {
            x.padding(0.2);
        }

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
            .attr('x', d => x(this.dateFormat(d['data']['date'])))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d[1]))
            .attr('height', 0)
            .on("mouseover", (d) => {
                const date = this.dateFormat(d['data']['date']);
                const offsetX = x(date);
                const offsetY = y(d[1]);
                const html = items.map(i => `<li>${i.title}: ${d['data'][i.field]} </li>`).join("");
                this.tooltip.Html(`${date} <br> ${html}`).Offset(offsetX, offsetY).Show();
            })
            .transition().duration(500)
            .attr('height', d => y(d[0]) - y(d[1]));
        bars.exit().remove();
        layers.exit().transition().duration(300).attr('height', 0).remove();
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
        const values = this.tickValues().map(this.dateFormat);
        const axis = this.selectXAxis().call(axisBottom(x).tickValues(values));
        const barWidth = x.bandwidth();
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