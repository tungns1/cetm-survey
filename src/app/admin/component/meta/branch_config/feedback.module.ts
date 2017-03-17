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
        <span translate>LANGAUGE_FEEDBACK_REQUIER</span> : 
        <input [(ngModel)]="value.required" (change)="OnChange()" type="checkbox" />
    `,
    providers: [FEEDBACK_CONTROL_VALUE_ACCESSOR]
})
class FeedbackConfigComponent implements ControlValueAccessor {
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
import { SharedService } from '../../shared';

@NgModule({
    imports: [FormsModule, CommonModule, SharedService.I18n.TranslateModule],
    declarations: [FeedbackConfigComponent],
    exports: [FeedbackConfigComponent]
})
export class FeedbackConfigModule {

}
