import { FormGroup, FormControl } from '@angular/forms';

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IPriorityConfig } from '../../../../../const/project';

const PRIORITY_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PriorityConfigComponent),
    multi: true
}

/**
 * CAUTION: this module is hard to use
 * No need for i18n
 */

@Component({
    selector: 'priority-config',
    templateUrl: 'priority-config.component.html',
    providers: [PRIORITY_CONTROL_VALUE_ACCESSOR]
})
export class PriorityConfigComponent implements ControlValueAccessor {
    private text: string;
    private defaultConfig: IPriorityConfig = {
        priority_step: 0,
        moved_ticket: 1,
        restore_ticket: 1,
        // segment: 6 cat
        internal_vip_card: 1,
        customer_vip_card: 1,
        privileged_customer: 1,
        booked_ticket: 1,
        // restricted
        min_priority_restricted: 1 << 16,
        min_priority_unordered_call: 1 << 16
    }

    protected value: IPriorityConfig = this.defaultConfig;

    private onChangeCallback = (v) => { };

    Reset() {
        this.writeValue({});
        this.value.priority_step = this.defaultConfig.priority_step;
        this.OnChange();
    }

    writeValue(v: any) {
        this.value = Object.assign({}, this.defaultConfig, v);
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
    declarations: [PriorityConfigComponent],
    exports: [PriorityConfigComponent]
})
export class PriorityConfigModule {

}
