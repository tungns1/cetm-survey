import { Component, forwardRef, ExistingProvider } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiFilePickerComponent),
    multi: true
}

@Component({
    selector: 'multi-file-picker',
    template: `
        <div *ngFor="let src of srcs; let i = index;" fxLayout="row" fxLayoutGap="10px" class="margin-t-15">
            <file-picker fxFlex [ngModel]="src" (ngModelChange)="onChange(i, $event)" ></file-picker>
            <i fxFlex="5%" class="fa fa-times fa-2x pointer center" (click)="remove(i)"> </i>
        </div>

        <div class="divider margin-b-15"></div>

        <span class="pointer" (click)="add()"><i class="fa fa-plus"></i>Add</span>
    `,

    providers: [MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class MultiFilePickerComponent implements ControlValueAccessor {
    srcs = [];
    protected onChangeCallback = (v) => { };

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.srcs = [].concat(data);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }


    add() {
        this.srcs.push('');
    }

    remove(i) {
        this.srcs.splice(i, 1);
        this.onChangeCallback(this.srcs);
    }

    onChange(i: number, src: string) {
        setTimeout(_ => {
            this.srcs[i] = src;
            this.onChangeCallback(this.srcs);
        });
    }
}
