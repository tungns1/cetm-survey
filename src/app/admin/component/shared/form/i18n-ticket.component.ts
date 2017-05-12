import { FormGroup, FormControl } from '@angular/forms';
import { ProjectConfig } from '../../../shared';
import { L10nText } from '../../../../shared/util';

const supported_cultures = ProjectConfig.general.supported_cultures;

export function NewL10nForm(data: L10nText) {
    data = data || {};
    const forms = {};
    supported_cultures.forEach(code => forms[code] = new FormControl(data[code] || ''));
    return new FormGroup(forms);
}

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';


import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const L10N_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => L10nTicketComponent),
    multi: true
}

@Component({
    selector: 'l10n-ticket',
    template: `
    <div *ngFor="let code of codes">
        <label>{{names[code]}}</label>
        <app-quill-editor [(ngModel)]="values[code]" (change)="OnChange()" rows="8" cols="40"></app-quill-editor>
    </div>
    `,

    providers: [L10N_CONTROL_VALUE_ACCESSOR]
})
export class L10nTicketComponent implements ControlValueAccessor {
    codes = supported_cultures;
    names = supported_cultures;
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
