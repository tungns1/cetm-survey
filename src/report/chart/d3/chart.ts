
export interface Item {
    field: string;
    axis?: 'left' | 'right';
    color?: string;
    title?: string;
    _hidden?: boolean;
}

import { select, Selection, BaseType } from 'd3-selection';
import { autoFormatDate, Format } from './locale';
import { extent } from 'd3-array';
import { timeDay, timeWeek, timeMonth, timeYear } from 'd3-time';
import { scaleTime, scaleLinear } from 'd3-scale';
import { AxisScale, axisBottom, axisLeft } from 'd3-axis';

const intervals = {
    day: timeDay,
    week: timeWeek,
    month: timeMonth,
    year: timeYear
}

export class AbstractChart {
    constructor(protected el: HTMLElement) {

    }

    width(w: number) {
        this._width = w;
        return this;
    }

    height(h: number) {
        this._height = h;
        return this;
    }

    margin(top: number, right: number, bottom: number, left: number) {
        this._margin = {
            left: left,
            top: top,
            right: right,
            bottom: bottom
        }
        return this;
    }

    data(d: any) {
        this._data = d;
        this._extents = extent(this._data, d => d.date);
        return this;
    }

    items(i: Item[]) {
        this._items = i;
        return this;
    }

    protected svg() {
        if (!this._svg) {
            this._svg = select(this.el).append('svg')
                .attr('width', this._width)
                .attr('height', this._height)
                .append('g').attr('transform', `translate(${this._margin.left},${this._margin.top})`);
            this._svg.append('g').attr('class', 'y1 axis');
            this._svg.append('g').attr('class', 'y2 axis');
            this._svg.append('g').attr('class', 'x axis');
            this.drawGrid();
            // this._svg.attr('shape-rendering', 'crispEdges');
        }
        return this._svg;
    }

    protected selectXAxis() {
        return this.svg().select('g.x.axis').attr('transform', `translate(0, ${this.mainHeight()})`);
    }

    protected dateFormat = Format.day;
    protected interval = intervals.day;

    SetPeriod(p: string) {
        this.dateFormat = Format[p] || Format.day;
        this.interval = intervals[p] || intervals.day;
        return this;
    }

    private max_ticks = 8;

    protected tickValues<Domain>() {
        const min = this._extents[0];
        const max = this._extents[1];
        const count = this.interval.count(min, max);

        const step = Math.ceil(count / this.max_ticks) || 1;
        const values = this.interval.range(min, max, step);
        const includeMax = values.length < this.max_ticks || this.interval.offset(values[values.length - 1], step) < max;
        if (includeMax) {
            values.push(max);
        } else {
            values[values.length - 1] = max;
        }
        return values;
    }

    public render() {

    }

    toggle(item: Item) {
        item._hidden = !item._hidden;
        this.render();
    }

    protected mainWidth() {
        return this._width - this._margin.left - this._margin.right;
    }

    protected mainHeight() {
        return this._height - this._margin.top - this._margin.bottom;
    }

    protected getItems() {
        return this._items.filter(i => !i._hidden);
    }

    protected drawGrid() {
        // set the ranges
        const w = this.mainWidth();
        const h = this.mainHeight();
        const x = scaleLinear().range([0, w]);
        const xA = this._svg.append('g').attr('class', 'grid')
            .attr('transform', `translate(0, ${h})`)
            .call(axisBottom(x).ticks(24).tickSize(-h).tickFormat(() => ""));
        xA.selectAll('line').attr("stroke", "lightgrey").attr("stroke-opacity", 0.7).attr("shape-rendering", "crispEdges");
        xA.selectAll('path').attr("stroke-width", 0);
        var y = scaleLinear().range([h, 0]);
        const yA = this._svg.append('g').attr('class', 'grid')
            .call(axisLeft(x).ticks(24).tickSize(-w).tickFormat(() => ""));
        yA.selectAll('line').attr("stroke", "lightgrey").attr("stroke-opacity", 0.7).attr("shape-rendering", "crispEdges");
        yA.selectAll("path").attr("stroke-width", 0);
    }

    protected _width: number;
    protected _height: number;
    protected _margin: {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    } = {};
    protected _data: any[] = [];
    protected _extents: [Date, Date] = [new Date, new Date];
    protected _items: Item[] = [];
    protected _svg: Selection<any, any, any, any>;
}



import { Component, ElementRef, Input } from '@angular/core';

export class ChartComponent<T extends AbstractChart> {
    constructor(private el: ElementRef) {

    }

    chart: T;

    make: (el: HTMLElement) => T;

    set data(d: any[]) {
        this.getChart().data(d).render();
    }

    set items(d: Item[]) {
        this.getChart().items(d).render();
    }

    set period(p: string) {
        this.getChart().SetPeriod(p).render();
    }

    getChart() {
        if (!this.chart) {
            const el: HTMLElement = this.el.nativeElement;
            this.chart = this.make(el);
            this.chart.width(el.offsetWidth).height(el.offsetHeight).margin(20, 50, 20, 60);
        }
        return this.chart;
    }


    static inputs = ['data', 'items', 'period'];
}