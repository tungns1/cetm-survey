import { FormGroup, FormControl } from '@angular/forms';
import { ProjectConfig } from '../../../shared';
import { L10nText } from '../../../../shared/util';

export function NewL10nForm(data: L10nText) {
    data = data || {};
    const forms = {};
    const supported_cultures = ProjectConfig.general.supported_cultures;
    supported_cultures.forEach(code => forms[code] = new FormControl(data[code] || ''));
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
    <div *ngFor="let code of codes" fxLayout="row" fxLayoutGap="20px" class="rowCtrl">
        <span fxFlex="20%" class="margin-t-5">{{code | languageName}}</span>
        <textarea rows="1" fxFlex class="ctrlInput" [(ngModel)]="_values[code]" (change)="OnChange()"></textarea>
    </div>
    `,
    providers: [L10N_CONTROL_VALUE_ACCESSOR]
})
export class L10nFormComponent implements ControlValueAccessor {
    codes = ProjectConfig.general.supported_cultures;
    private values: L10nText = {};
    private _values: L10nText = {};
    private onChangeCallback = (v) => { };

    writeValue(v: L10nText) {
        this.values = v || {};
        Object.keys(this.values).map(el => {
            this._values[el] = this.values[el].replace(/<br>/g, '\n').replace(/  +/g, ' ')
        });
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        Object.keys(this._values).map(el => {
            this.values[el] = this._values[el].replace(/\n/g, '<br>').replace(/  +/g, ' ')
        });
        this.onChangeCallback(this.values);
    }

}
