import { FormGroup, FormControl } from '@angular/forms';

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const FEEDBACK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FeedbackConfigComponent),
    multi: true
}


@Component({
    selector: 'feedback-config',
    template: `
        <br>
        <span i18n>Feedback Required</span> : 
        <input [(ngModel)]="value.required" (change)="OnChange()" type="checkbox" />
    `,
    providers: [FEEDBACK_CONTROL_VALUE_ACCESSOR]
})
export class FeedbackConfigComponent implements ControlValueAccessor {
    private text: string;
    private value = {
        required: false
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
    declarations: [FeedbackConfigComponent],
    exports: [FeedbackConfigComponent]
})
export class FeedbackConfigModule {

}
