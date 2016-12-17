
export interface Item {
    field: string;
    axis?: 'left' | 'right';
    color?: string;
    _hidden?: boolean;
}

import { select, Selection, BaseType } from 'd3-selection';
import { autoFormatDate, Format } from './locale';
import { extent } from 'd3-array';
import { timeDay, timeWeek, timeMonth, timeYear } from 'd3-time';
import { scaleTime } from 'd3-scale';
import { axisBottom } from 'd3-axis';

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
            // this._svg.attr('shape-rendering', 'crispEdges');
        }
        return this._svg;
    }

    protected dateFormat = Format.day;
    protected interval = intervals.day;

    SetPeriod(p: string) {
        this.dateFormat = Format[p] || Format.day;
        this.interval = intervals[p] || intervals.day;
        return this;
    }

    protected makeX() {
        const min = this._extents[0];
        const max = this._extents[1];
        max.setTime(max.getTime() + 1000);
        const x = scaleTime().range([0, this.mainWidth()]);
        x.domain([min, max]);
        const count = this.interval.count(min, max);
        const step = Math.ceil(count / 8) || 1;
        const values = this.interval.range(min, max, step);
        const axis = axisBottom(x).tickFormat(this.dateFormat).tickValues(values);
        return {
            x: x,
            axis: axis,
            count: count
        }
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