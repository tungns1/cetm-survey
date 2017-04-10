import { FormGroup, FormControl } from '@angular/forms';

import { 
    Component, Input, forwardRef, ExistingProvider,
    ChangeDetectionStrategy
 } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const JSON_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JSONFormComponent),
    multi: true
}

@Component({
    selector: 'json-text-form',
    template: `
        <div *ngIf="invalid" style="color:red"> 
            Text input is not a valid json string
        </div>
        <textarea class="format-textarea" [ngModel]="text" (ngModelChange)="onChange($event)">
        </textarea>
    `,
    providers: [JSON_CONTROL_VALUE_ACCESSOR]
})
export class JSONFormComponent implements ControlValueAccessor {
    private text: string;
    private onChangeCallback = (v) => { };

    writeValue(v: any) {
        this.text = JSON.stringify(v);
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
        } catch (e) {
            this.invalid = true;
        }
    }

    invalid = false;

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
