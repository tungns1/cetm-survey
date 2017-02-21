import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Model } from '../../../shared';

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
class UIFormComponent implements ControlValueAccessor {
    private text: string;
    private onChangeCallback = (v) => { };

    writeValue(v: Model.Ui.UI) {
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [UIFormComponent],
    exports: [UIFormComponent]
})
export class UIFormModule {

}
