import {
    Component, Input, forwardRef, ExistingProvider,
    ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';
import { XWinMiniMode } from '../shared';

const MINI_MODE_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MiniModeFormComponent),
    multi: true
}

@Component({
    selector: 'mini-mode-form',
    template: `
        <div> Mini mode form </div>
    `,
    providers: [MINI_MODE_CONTROL_VALUE_ACCESSOR]
})
export class MiniModeFormComponent implements ControlValueAccessor {
    private text: string;
    private onChangeCallback = (v) => { };
    invalid = false;

    disableEditTextArea: boolean = true;

    writeValue(v: XWinMiniMode) {
        this.text = JSON.stringify(v, null, '\t');
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
            this.invalid = false;
        } catch (e) {
            this.invalid = true;
        }
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [FormsModule, CommonModule, FlexLayoutModule, MaterialModule],
    declarations: [MiniModeFormComponent],
    exports: [MiniModeFormComponent]
})
export class MiniModeFormModule {

}