import { FormGroup, FormControl } from '@angular/forms';

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const JSON_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JSONFormComponent),
    multi: true
}


import { Lib } from '../../../shared';

@Component({
    selector: 'json-form',
    template: `
        <input class="hl-input" [(ngModel)]="text" (change)="OnChange()" />
    `,
   
    providers: [JSON_CONTROL_VALUE_ACCESSOR]
})
class JSONFormComponent implements ControlValueAccessor {
    private text: string;
    private onChangeCallback = (v) => { };

    writeValue(v: any) {
        this.text = JSON.stringify(v);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        try {
            let val = JSON.parse(this.text);
            this.onChangeCallback(val);
        } catch (e) {
            const toast = new Lib.Ui.Notification.Toast();
            toast.Error("Dữ liệu không đúng dạng JSON").Show();
        }
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [JSONFormComponent],
    exports: [JSONFormComponent]
})
export class JSONFormModule {

}
