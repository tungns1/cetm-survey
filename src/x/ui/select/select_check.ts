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
        <span *ngFor="let d of data" >
            <input type="checkbox" (ngModelChange)="check(d[idField], $event)">{{d[textField]}}
        </span>
    `,
    providers: [SELECT_CHECK_CONTROL_VALUE_ACCESSOR]
})
class SelectCheckComponent implements ControlValueAccessor {
    constructor(
        @Attribute('idField') private idField = 'id',
        @Attribute('textField') private textField = 'text') {
    }
    
    @Input() data = [];
    protected value = [];
    protected onChangeCallback = (v) => { };

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.value = data;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.value));
    }

    check(id: string, b: boolean) {
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
