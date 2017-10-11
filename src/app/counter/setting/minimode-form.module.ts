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
    templateUrl: "minimode-form.component.html",
    providers: [MINI_MODE_CONTROL_VALUE_ACCESSOR]
})
export class MiniModeFormComponent implements ControlValueAccessor {
    private onChangeCallback = (v) => { };

    writeValue(v: XWinMiniMode) {
        v = v || <any>{};
        v.rect = v.rect || {};
        v.rect.width;
        v.rect.height;
        v.options = v.options || {};
        if (v.enable === void 0) {
            v.enable = true;
        }
        this.value = v;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    protected value: XWinMiniMode = {
        enable: true,
        rect: {},
        options: {}
    };

    onChange() {
        this.onChangeCallback(this.value);
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatDialogModule, MatTabsModule } from '@angular/material';

@NgModule({
    imports: [FormsModule, CommonModule, FlexLayoutModule, MatButtonModule, MatDialogModule],
    declarations: [MiniModeFormComponent],
    exports: [MiniModeFormComponent]
})
export class MiniModeFormModule {

}