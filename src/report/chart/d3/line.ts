
import { AbstractChart } from './chart';


import { timeParse, timeFormat } from 'd3-time-format';
import { scalePoint, scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { line } from 'd3-shape';

import { select, event, Selection } from 'd3-selection';
import 'd3-transition';
import { max, extent } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

const div = select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
import { Item } from './chart';

export class LineChart extends AbstractChart {
    render() {
        const data = this._data;

        const x = this.getXAxis();
        const yLeft = this.getYLeftAxis();
        const yRight = this.getYRightAxis();

        const lines = this.svg().selectAll('.item').data(this.getItems());
        
        let t0 = (x.bandwidth() / 2) || 0;
        lines.enter().append('path').attr('class', 'item').merge(lines)
            .attr("transform", `translate(${t0}, 0)`).attr('d', i => {
                const y = i.axis === 'right' ? yRight : yLeft;
                const field = i.field;
                return line().x(v => x(v['time'])).y(v => {
                    return y(v[field]);
                })(data);
            }).attr('stroke-dasharray', function () {
                return (<SVGPathElement>this).getTotalLength(); // animate
            })
            .attr('stroke-dashoffset', function () {
                return (<SVGPathElement>this).getTotalLength(); // animate
            })
            .transition().duration(500)
            .attr('stroke-dashoffset', 0)
            .attr('fill', 'none')
            .attr('stroke', (i, j) => i.color || schemeCategory10[j]).attr('stroke-width', '2');
        lines.exit().remove();
    }

    getXAxis() {
        const x = scalePoint().range([0, this.mainWidth()]);
        x.domain(this._data.map(d => d.time));
        const axis = axisBottom(x);
        axis.ticks(10);

        this.svg().select('g.x.axis').attr('transform', `translate(0, ${this.mainHeight()})`).call(axis)
            .selectAll('text').style('text-anchor', 'end')
            .attr('dx', '-.8em').attr('dy', '.15em').attr('transform', 'rotate(-65)');
        return x;
    }

    getYLeftAxis() {
        const yLeft = scaleLinear().range([this.mainHeight(), 0]);
        const leftItems = this.getItems().filter(i => i.axis !== 'right');
        yLeft.domain([0, max(this._data, d => {
            return max(leftItems, i => d[i.field]);
        })]);
        if (leftItems.length > 0) {
            this.svg().select('g.y1.axis').call(axisLeft(yLeft));
        }
        return yLeft;
    }

    getYRightAxis() {
        const rightItems = this.getItems().filter(i => i.axis === 'right');
        const yRight = scaleLinear().range([this.mainHeight(), 0]);
        yRight.domain([0, max(this._data, d => {
            return max(rightItems, i => d[i.field]);
        })]);

        if (rightItems.length > 0) {
            this.svg().select('g.y2.axis')
                .attr('transform', `translate(${this.mainWidth()}, 0)`).call(axisRight(yRight));
        }
        return yRight;
    }
}

import { Component, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartComponent } from './chart';

@Component({
    selector: '[line-chart]',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: [...ChartComponent.inputs]
})
export class LineChartComponent extends ChartComponent<LineChart> {
    constructor(el: ElementRef) {
        super(el);
    }

    make = (el) => new LineChart(el);
}