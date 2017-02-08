import { FormGroup, FormControl } from '@angular/forms';
import { UI } from './model';

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const UI_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UIFormComponent),
    multi: true
}

@Component({
    selector: 'ui-form',
    template: `
        <input [(ngModel)]="text" (change)="OnChange()" />
    `,
    styles: [`
        input {
        margin-bottom: 15px;
        border-radius: 3px;
        height: 30px;
        border-style: solid;
        border: 1px solid #aeb0af;
        width: 100%;
    }
 `],
    providers: [UI_CONTROL_VALUE_ACCESSOR]
})
class UIFormComponent implements ControlValueAccessor {
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [UIFormComponent],
    exports: [UIFormComponent]
})
export class UIFormModule {

}
