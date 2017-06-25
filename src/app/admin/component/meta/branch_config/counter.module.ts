import { FormGroup, FormControl } from '@angular/forms';

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICounterConfig } from '../../../../../const/project';

const COUNTER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterConfigComponent),
    multi: true
}

@Component({
    selector: 'counter-config',
    template: `
        <br>
        <span i18n>Record Transaction</span> 
        <input [(ngModel)]="value.record_transaction" (change)="OnChange()"/>
    `,
    providers: [COUNTER_CONTROL_VALUE_ACCESSOR]
})
export class CounterConfigComponent implements ControlValueAccessor {
    protected value: ICounterConfig = {
        record_transaction: 'alway_off'
    }

    private onChangeCallback = (v) => { };

    writeValue(v: any) {
        this.value = v || {};
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        this.onChangeCallback(this.value);
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [CounterConfigComponent],
    exports: [CounterConfigComponent]
})
export class CounterConfigModule {

}
