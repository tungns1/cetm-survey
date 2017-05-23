import { FormGroup, FormControl } from '@angular/forms';
import { ProjectConfig } from '../../../shared';
import { L10nText } from '../../../../shared/util';

export function NewL10nForm(data: L10nText) {
    data = data || {};
    const forms = {};
    ProjectConfig.general.supported_cultures.forEach(code => forms[code] = new FormControl(data[code] || ''));
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
        <h3 style="width: 40%; margin: 10px auto">{{code | languageName}}</h3>
        <div class="quillEditor">
            <app-quill-editor [(ngModel)]="values[code]" (ngModelChange)="OnChange()" rows="8" cols="40"></app-quill-editor>
        </div>
    </div>
    `,

    providers: [L10N_CONTROL_VALUE_ACCESSOR]
})
export class L10nTicketComponent implements ControlValueAccessor {
    codes = ProjectConfig.general.supported_cultures;
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
