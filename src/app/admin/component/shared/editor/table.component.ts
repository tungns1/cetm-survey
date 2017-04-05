import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ITableField, ITableAction } from './model';

@Component({
    selector: 'app-datatable',
    templateUrl: 'table.component.html'
})
export class AppDataTableComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    @Input() fields: ITableField[] = [];
    @Input() data: any[] = [];
    @Input() name: string;
    @Output() action = new EventEmitter<ITableAction>();

    onAction(action: string, value: any) {
        this.action.emit({
            action, value
        });
    }
}