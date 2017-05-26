import {
    Component, Input, forwardRef, ExistingProvider,
    ChangeDetectionStrategy, NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';

const JSON_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JSONFormComponent),
    multi: true
}

@Component({
    selector: 'json-text-form',
    templateUrl: './json-text-form.component.html',
    styleUrls: ['./json-text-form.component.scss'],
    providers: [JSON_CONTROL_VALUE_ACCESSOR]
})
export class JSONFormComponent implements ControlValueAccessor {
    private text: string;
    private onChangeCallback = (v) => { };
    invalid = false;

    disableEditTextArea: boolean = true;

    writeValue(v: any) {
        this.text = JSON.stringify(v, null, '\t');
        this.invalid = false;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    onChange(text: string) {
        try {
            let val = JSON.parse(text);
            this.onChangeCallback(val);
            this.invalid = false;
        } catch (e) {
            this.invalid = true;
        }
    }
}