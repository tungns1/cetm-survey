import {
    Component, Input, forwardRef, ExistingProvider,
    ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';


const MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiFilePickerComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'multi-file-picker',
    template: `
        <span (click)="add()"><i class="fa fa-plus"></i>Add</span>
        <div *ngFor="let src of srcs; let i = index;">
            <file-picker [ngModel]="src" (ngModelChange)="onChange(i, $event)" ></file-picker>
            <i class="fa fa-trash pointer" (click)="remove(i)"> </i>
        </div>
    `,

    providers: [MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class MultiFilePickerComponent implements ControlValueAccessor {
    constructor(
        private cdf: ChangeDetectorRef
    ) { }

    protected srcs = [];
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
            // this.cdf.detectChanges();
        });
    }
}
