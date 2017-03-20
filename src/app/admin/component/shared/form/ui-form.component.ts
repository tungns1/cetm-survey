import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UI } from '../../../../shared/model/ui';

const UI_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UIFormComponent),
    multi: true
}

@Component({
    selector: 'ui-form',
    template: `
        <input class="hl-input" [(ngModel)]="text" (change)="OnChange()" />
    `,

    providers: [UI_CONTROL_VALUE_ACCESSOR]
})
export class UIFormComponent implements ControlValueAccessor {
    private text: string;
    private onChangeCallback = (v) => { };

    writeValue(v: UI) {
        this.text = JSON.stringify(v);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        this.onChangeCallback(JSON.parse(this.text));
    }

}
