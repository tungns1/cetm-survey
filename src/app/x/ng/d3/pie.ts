
import { AbstractChart } from './chart';
import { arc, pie } from 'd3-shape';
import { select, event, Selection } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';
import { easeBounce } from 'd3-ease';

export class PieChart extends AbstractChart {

    data(d: any) {
        this._data = d;
        return this;
    }

    protected _data: any;

    protected svg() {
        if (!this._svg) {
            this._svg = select(this.el).append('svg')
                .attr('width', this._width)
                .attr('height', this._height)
                .append('g').attr('transform', `translate(${this._width / 2},${this._height / 2})`);
            this._svg.on('mouseout', () => {
                this.tooltip.Hide();
            })
            // this._svg.attr('shape-rendering', 'crispEdges');
        }
        return this._svg;
    }

    getRadius() {
        return Math.min(this._width, this._height) / 2;
    }

    render() {
        const radius = this.getRadius();
        var arcs = arc()
            .outerRadius(radius - 30)
            .innerRadius(radius / 3);

        var labelArc = arc()
            .outerRadius(radius - 60)
            .innerRadius(radius - 60);

        const data = this._data;
        const items = this.getItems();

        function tweenPie(b) {
            b.innerRadius = 0;
            var i = interpolate({ startAngle: 0, endAngle: 0 }, b);
            return function (t) { return arcs(i(t)); };
        }

        this.svg().datum(items);

        var pies = pie().sort(null).value(i => data[i['field']] || 0);
        var paths = this.svg().selectAll("path").data(pies);
        const that = this;

        paths.enter().append("path").merge(paths).attr("d", <any>arcs)
            .style("fill", d => d.data['color'])
            .attr("stroke", "#fff")
            .style('opacity', 0.8)
            .on('mouseover', function (d) {
                const title = d.data['title'];
                const value = d.value;
                const percent = (d.endAngle - d.startAngle) * 100 / (Math.PI * 2);
                const html = `${title}: ${value} (${Math.round(percent * 100) / 100}%)`;
                this['style'].opacity = 1;
                that.tooltip.Html(html).Offset(0, 0).Show();
            })
            .on('mouseout', function () {
                this['style'].opacity = 0.8;
            })
            .transition().ease(easeBounce).duration(2000).attrTween("d", tweenPie)
        paths.exit().remove();

        var texts = this.svg().selectAll("text").data(pies);
        texts.enter().append("text").merge(texts)
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${labelArc.centroid(<any>d)})`)
            .attr("dy", ".35em")
            .text((d) => { return d.value; });
        texts.exit().remove();
    }
}

import { Component, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartComponent } from './chart';

@Component({
    selector: '[pie-chart]',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: [...ChartComponent.inputs]
})
export class PieChartComponent extends ChartComponent<PieChart> {
    constructor(el: ElementRef) {
        super(el);
    }

    make = (el) => new PieChart(el);

}