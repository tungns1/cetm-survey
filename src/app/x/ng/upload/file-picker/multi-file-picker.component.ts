import { 
    Component, Input, forwardRef, ExistingProvider,
    Output, EventEmitter 
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
        <span (click)="add()"><i class="fa fa-plus"></i></span>
        <div *ngFor="let src of srcs; let i = index;">
            <file-picker (change)="onChange($event)" [(ngModel)]="srcs[i]"></file-picker>
            <i class="fa fa-trash pointer" (click)="remove(i)"> </i>
        </div>
    `,

    providers: [MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class MultiFilePickerComponent implements ControlValueAccessor {
    protected srcs = [];
    protected onChangeCallback = (v) => { };

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.srcs = data;
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
        this.onChange(null);
    }

    onChange(e: Event) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        this.onChangeCallback(this.srcs);
        this.change.next();
    }

    @Output() change = new EventEmitter();
}
