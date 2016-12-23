
import { AbstractChart } from './chart';

import { scaleTime, ScaleTime, scaleLinear, ScaleLinear, schemeCategory10 } from 'd3-scale';
import { line, curveLinear } from 'd3-shape';

import { max, extent } from 'd3-array';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';

import { Item } from './chart';

const lineCurve = curveLinear;

import { mouse, Selection } from 'd3-selection';
import { bisector } from 'd3-array';
const bisectDate = bisector((d) => d['date']).left;

export class LineChart extends AbstractChart {

    render() {
        const data = this._data;
        if (data.length < 1) {
            return;
        }

        const x = this.getXAxis();
        const yLeft = this.getYLeftAxis();
        const yRight = this.getYRightAxis();


        if (!this.focus) {
            this.onMouseOver();
        }


        this.mouseMove = (e) => {
            var x0 = x.invert(mouse(e)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i];
            if (!d1) {
                d1 = d0
            }
            var d = (x0.getTime() - d0.date.getTime()) > (d1.date.getTime() - x0.getTime()) ? d1 : d0;
            const y = yLeft;
            const items = this.getItems();
            let yMax = yLeft(max(items.map(i => d[i.field])));
            const date = d.date;

            this.focus.remove();
            this.focus = this.svg().append("g").style("display", "null");

            this.focus.selectAll("rect").remove();
            this.focus.selectAll("text").remove();
            this.focus.selectAll("circle").remove();

            const rect = this.focus.append("rect")
                .attr("x", 9).attr("dy", "0em").attr("fill", "black")
                .attr("stroke-width", 0).attr("fill-opacity", "0.8");

            const boxes: { width: number, height: number, x: number, y: number }[] = [];

            const focusedDate = this.focus.append("text")
                .attr("x", 12).attr("dy", "1em").attr("fill", "yellow").text(this.dateFormat(date));

            items.forEach((i, j) => {
                const text = this.focus.append("text").attr("x", 12).attr("dy", `${j + 2}em`)
                    .attr("fill", i.color)
                    .text(`- ${i.title}: ${d[i.field]}`);
                boxes.push(text.node().getBBox());
            });
            const rectHeight = max(boxes, b => b.y) + boxes[boxes.length - 1].height + 10;
            const rectWidth = max(boxes, b => b.width) + 10;
            rect.attr("width", `${rectWidth}`).attr("height", `${rectHeight}`);
            const focusX = Math.min(x(date), this.mainWidth() - rectWidth);
            const focusY = Math.min(yMax, this.mainHeight() - rectHeight);
            this.focus.attr("transform", "translate(" + focusX + "," + focusY + ")");
            const offsetX = x(date) - focusX;
            const offsetY = yMax - focusY;

            items.forEach(i => {
                this.focus.append("circle").attr("r", 4.5).attr("fill", i.color)
                    .attr("transform", `translate(${offsetX}, ${offsetY + yLeft(d[i.field]) - yMax})`);
            })
        }

        const lines = this.svg().selectAll('.item').data(this.getItems());

        lines.enter().append('path').attr('class', 'item').merge(lines)
            .attr('d', i => {
                const y = i.axis === 'right' ? yRight : yLeft;
                const field = i.field;
                return line().curve(lineCurve).x(v => x(v['date'])).y(v => {
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
        const x = scaleTime().range([0, this.mainWidth()]);
        x.domain(this._extents);
        const tickValues = this.tickValues();
        const axis = axisBottom(x).tickFormat(this.dateFormat).tickValues(tickValues);
        this.selectXAxis().call(axis);
        this.x = x;
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
        this.y = yLeft;
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
                .attr('transform', `translate(${this.mainWidth()}, 0) `).call(axisRight(yRight));
        }
        return yRight;
    }

    onMouseOver() {
        this.focus = this._svg.append("g").style("display", "none");

        let that = this;

        this._svg.on("mouseover", () => this.focus.style("display", null))
            .on("mouseout", () => this.focus.style("display", "none"))
            .on("mousemove", function () { that.mouseMove(this) });

    }



    mouseMove = function (e) { };
    focus = null;

    private x: ScaleTime<number, number>;
    private y: ScaleLinear<any, any>

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