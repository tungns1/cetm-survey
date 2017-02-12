import { FormGroup, FormControl } from '@angular/forms';
import { SharedConfig, SharedUtil } from '../../../shared';

export function NewL10nForm(data: SharedUtil.L10nText) {
    data = data || {};
    const forms = {};
    Object.keys(SharedConfig.Cultures).forEach(code => forms[code] = new FormControl(data[code] || ''));
    return new FormGroup(forms);
}

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';


import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const L10N_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => L10nFormComponent),
    multi: true
}

@Component({
    selector: 'l10n-form',
    template: `
    <div *ngFor="let code of codes">
        <label>{{names[code]}}</label>
        <input [(ngModel)]="values[code]" (change)="OnChange()" />
    </div>
    `,
    styles: [`
        input {
         margin-bottom: 15px;
        border-radius: 3px;
        height: 30px;
        padding-left: 5px;
        border: 1px solid #aeb0af;
        width: 100%;
        }
    `],
    providers: [L10N_CONTROL_VALUE_ACCESSOR]
})
class L10nFormComponent implements ControlValueAccessor {
    codes = Object.keys(SharedConfig.Cultures);
    names = SharedConfig.Cultures;
    private values: SharedUtil.L10nText = {};
    private onChangeCallback = (v) => { };

    writeValue(v: SharedUtil.L10nText) {
        this.values = v || {};
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        this.onChangeCallback(this.values);
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [L10nFormComponent],
    exports: [L10nFormComponent]
})
export class CultureModule {

}
