import { Component, Input, forwardRef, ExistingProvider, Attribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SELECT_CHECK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectCheckComponent),
    multi: true
}

interface IView {
    id: string;
    text: string;
    checked?: boolean;
}

@Component({
    selector: 'select-check',
    templateUrl: 'select-check.html',
    styleUrls: ['select-check.scss'],
    providers: [SELECT_CHECK_CONTROL_VALUE_ACCESSOR]
})
export class SelectCheckComponent implements ControlValueAccessor {
    constructor(
        @Attribute('idField') private idField,
        @Attribute('textField') private textField
    ) {
        this.idField = this.idField || 'id';
        this.textField = this.textField || 'text';
    }

    @Input() set data(arr: any[]) {
        this.views = (arr || []).map(a => {
            return {
                id: a[this.idField],
                text: a[this.textField]
            }
        });
        this.all = this.isAll();
        this.none = this.isNone();
    }
    @Input() multiple: boolean = true;

    views: IView[] = [];
    selected: { [index: string]: boolean } = {};
    all = false;
    none = true;

    protected onChangeCallback = (v: string[]) => { };

    SetAll(b: boolean) {
        this.views.forEach(v => {
            this.selected[v.id] = b;
        });
        this.onChange();
    }

    writeValue(arr: any[]) {
        this.selected = {};
        if (arr != null && arr.length > 0) {
            (arr || []).forEach(d => this.selected[d] = true);
        }

    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    onChange() {
        this.all = this.isAll();
        this.none = this.isNone();
        const arr = this.views
            .filter(v => this.selected[v.id])
            .map(v => v.id);
        this.onChangeCallback(arr);
    }

    private isAll() {
        return Array.isArray(this.views) && !this.views.some(v => !this.selected[v.id]);
    }

    private isNone() {
        return !this.views.some(v => this.selected[v.id]);
    }

    toggleItem(item: string) {
        if (this.multiple) {
            this.selected[item] = !this.selected[item];
        } else {
            this.selected = {};
            this.selected[item] = true;
        }
        this.onChange();
    }
}