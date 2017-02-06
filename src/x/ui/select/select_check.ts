import { Component, Input, forwardRef, ExistingProvider, Attribute } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';
import { TranslateService } from '../../i18n/translate.service';


const SELECT_CHECK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectCheckComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'select-check',
    template: `
        <input type="checkbox" (change)="checkAll()" >&nbsp;<span translate>LABEL_CHOOSE_ALL</span><br>
        <span *ngFor="let d of data" class="pointer">
            <input type="checkbox" [(ngModel)]="values[d[idField]]" (change)="check(d, $event)">{{d[textField]}}<br>
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
    private isAll = false;
    private values = {};
    protected value = [];
    protected onChangeCallback = (v) => { };

    checkAll() {
        this.isAll = !this.isAll;
        if (this.isAll) {
            this.writeValue(this.data.map(d => d[this.idField]));
        } else {
            this.writeValue([]);
        }

        this.OnChange();
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

    check(d: any, e: Event) {
        let id = d[this.idField];
        e.preventDefault();
        e.stopPropagation();
        let b = e.target['checked'];

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
