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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SELECT_CHECK_CONTROL_VALUE_ACCESSOR]
})
export class SelectCheckComponent implements ControlValueAccessor, OnInit, OnDestroy {
    constructor(
        @Attribute('idField') private idField,
        @Attribute('textField') private textField) {
        this.idField = this.idField || 'id';
        this.textField = this.textField || 'text';
    }

    @Input() set data(arr: any[]) {
        const newView = (arr || []).map(a => {
            return {
                id: a[this.idField],
                text: a[this.textField],
                checked: false
            }
        });
        this.options$.next(newView);
    }

    private options$ = new BehaviorSubject<IView[]>([]);
    private selected$ = new BehaviorSubject<{ [index: string]: boolean }>({});
    private hasAll$ = this.options$.map(view => view.length > 1);
    private view$ = combineLatest(this.options$, this.selected$)
        .map(([options, selected]) => {
            return options.map(o => {
                return <IView>{
                    id: o.id,
                    text: o.text,
                    checked: selected[o.id]
                }
            });
        }).debounceTime(50).share();

    protected onChangeCallback = (v: string[]) => { };
    private all$ = this.view$.map(view => {
        // console.log("all", view);
        return view.some(v => !v.checked);
    }).map(notAll => {
        return !notAll;
    }).share();

    SetAll(b: boolean) {
        const value = {};
        this.options$.value.forEach(v => {
            value[v.id] = b;
        });
        this.selected$.next(value);
    }

    private subscription: ISubscription;

    ngOnInit() {
        this.subscription = this.view$.subscribe(view => {
            let selected = view.filter(v => v.checked);
            this.onChangeCallback(selected.map(s => s.id));
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    writeValue(valueArray: any[]) {
        if (!Array.isArray(valueArray)) {
            valueArray = [];
        }
        const value = {};
        valueArray.forEach(d => value[d] = true);
        this.selected$.next(value);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    changeValue(id: string, b: boolean) {
        const value = this.selected$.value;
        value[id] = b;
        this.selected$.next(value);
    }

}
