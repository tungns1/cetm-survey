import { Component, Input, forwardRef, ExistingProvider, Attribute } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';


const SELECT_CHECK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectCheckComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'select-check',
    template: `
        <input type="checkbox" (change)="checkAll(changes=!changes)" >&nbsp;Chọn tất cả<br>
        <span *ngFor="let d of data" class="pointer" (click)="toggle($event, d)">
            <input type="checkbox" [ngModel]="values[d[idField]]">{{d[textField]}}<br>
        </span>
    `,
    providers: [SELECT_CHECK_CONTROL_VALUE_ACCESSOR]
})
class SelectCheckComponent implements ControlValueAccessor {
    constructor(
        @Attribute('idField') private idField,
        @Attribute('textField') private textField) {
        this.idField = this.idField || 'id';
        this.textField = this.textField || 'text';
    }

    @Input() data = [];
    private values = {};
    protected value = [];
    protected onChangeCallback = (v) => { };

    checkAll(event) {
        let selects: any[] = [];
        this.data.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        this.value = selects;
    }

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.value = data;
        this.values = {};
        this.value.forEach(id => this.values[id] = true);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.value));
    }

    toggle(e: Event, d: any) {
        let id = d[this.idField];
        e.preventDefault();
        e.stopPropagation();
        this.values[id] = !this.values[id];
        const b = this.values[id];
        if (b) {
            this.value.push(id);
        } else {
            const index = this.value.indexOf(id);
            if (index !== -1) {
                this.value.splice(index, 1);
            }
        }

        this.OnChange();
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [SelectCheckComponent],
    exports: [SelectCheckComponent]
})
export class SelectCheckModule {

}
