import { FormGroup, FormControl } from '@angular/forms';
import { LOCALES } from '../../../shared';
import { L10nText } from '../../../../shared/util';

export function NewL10nForm(data: L10nText) {
    data = data || {};
    const forms = {};
    Object.keys(LOCALES.CULTURES).forEach(code => forms[code] = new FormControl(data[code] || ''));
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
        <label i18n>{{names[code]}}</label>
        <input class="hl-input margin-top-edittext" [(ngModel)]="values[code]" (change)="OnChange()" />
    </div>
    `,

    providers: [L10N_CONTROL_VALUE_ACCESSOR]
})
export class L10nFormComponent implements ControlValueAccessor {
    codes = Object.keys(LOCALES.CULTURES);
    names = LOCALES.CULTURES;
    private values: L10nText = {};
    private onChangeCallback = (v) => { };

    writeValue(v: L10nText) {
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
