
import { AbstractChart, Item } from './chart';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { max, extent } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

const colors = scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

export class BarChart extends AbstractChart {

    render() {
        const data = this._data;
        if (data.length < 1) {
            return;
        }
        const items = this.getItems();
        const svg = this.svg();
        const x = this.getXAxis();
        const y = this.getYAxis();

        if (data.length < 3) {
            x.padding(0.5);
        } else {
            x.padding(0.2);
        }

        const group = scaleBand().rangeRound([0, x.bandwidth()]).padding(0.06);
        group.domain(items.map((i, index) => i.field));
        const height = this.mainHeight();
        const groups = svg.selectAll('.bar').data(items);
        const me = this;
        // x(this.dateFormat(d.date)) + group(i.field), y(d[i.field]), i.color, i.title, d.date, d[i.field]
        const bars = groups.enter().append('g').attr('class', 'bar')
            .merge(groups)
            .selectAll('rect').data(i => data.map(d => {
                return {
                    date: this.dateFormat(d.date),
                    data: d,
                    color: i.color,
                    x: x(this.dateFormat(d.date)) + group(i.field),
                    y: y(d[i.field])
                };
            }))
        const that = this;
        bars.enter().append('rect')
            .merge(bars).attr('x', d => d.x)
            .on("mouseover", function (d) {
                const date = d.date;
                const x = d.x;
                const y = d.y;
                const html = items.map(i => `<li>${i.title}: ${d.data[i.field]} </li>`).join("");
                this['style'].opacity = 1;
                that.tooltip.Html(`${date} <br> ${html}`).Offset(x, y).Show();
            })
            .on('mouseout', function () {
                this['style'].opacity = 0.8;
            })
            .style('opacity', 0.8)
            .attr('width', group.bandwidth())
            .attr('y', d => d.y)
            .attr('height', 0)
            .transition().duration(500)
            .attr('height', d => height - d.y)
            .attr('fill', d => d.color);
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
        const values = this.tickValues().map(this.dateFormat);
        const axis = this.selectXAxis().call(axisBottom(x).tickValues(values));
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