import {
    Component, Directive, 
    Input, OnInit, ElementRef,
    ContentChildren, QueryList
} from '@angular/core';

import { CellObject } from 'xlsx';

@Component({
    selector: 'export-attribute',
    template: ``
})
export class ExportAttribute {
    @Input() name: string;
    @Input() title: string;
}


@Directive({
    selector: '[export=string],[export=number]'
})
export class ExportCell {
    constructor(private el: ElementRef) { }
    private native: HTMLElement = this.el.nativeElement;
    @Input() export = "string";
    GetCell() {
        const c: CellObject = {
            v: this.native.innerText,
            t: this.type
        }
        return c;
    }

    get type() {
        return ExportCell.types[this.export] || "s";
    }

    private static types = {
        "string": "s",
        "boolean": "b",
        "number": "n",
        "date": "d"
    }
}

@Directive({
    selector: '[export-row]'
})
export class ExportRow {
    @ContentChildren(ExportCell) cells: QueryList<ExportCell>;

    GetRow() {
        return this.cells.map(c => c.GetCell());
    }
}

@Directive({
    selector: '[export-table]'
})
export class ExportTable {
    @ContentChildren(ExportRow) rows: QueryList<ExportRow>;
    @Input() title: string;

    GetTable() {
        return this.rows.map(r => r.GetRow());
    }
}
