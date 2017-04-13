import { Component, Input, forwardRef, ExistingProvider, Attribute, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ISubscription } from 'rxjs/Subscription';

const SELECT_CHECK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectCheckComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

interface IView {
    id: string;
    text: string;
    checked?: boolean;
}

@Component({
    selector: 'select-check',
    templateUrl: 'select-check.html',
    providers: [SELECT_CHECK_CONTROL_VALUE_ACCESSOR]
})
export class SelectCheckComponent implements ControlValueAccessor {
    constructor(
        @Attribute('idField') private idField,
        @Attribute('textField') private textField) {
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

    private views: IView[] = [];
    private selected: { [index: string]: boolean } = {};
    private all = false;
    private none = true;

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
        return !this.views.some(v => !this.selected[v.id]);
    }

    private isNone() {
        return !this.views.some(v => this.selected[v.id]);
    }


}
