import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

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
        <div *ngFor="let src of srcs; let i = index;" >
            <file-picker [(ngModel)]="srcs[i]" (ngModelChange)="OnChange()"></file-picker>
            <i class="fa fa-trash pointer" (click)="remove(i)"> </i>
        </div>
    `,
    styles: [`
        input {
        margin-bottom: 15px;
        border-radius: 3px;
        height: 30px;
        border-style: solid;
        border: 1px solid #aeb0af;
        width: 78%;
    }
    
 `],
    providers: [MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
class MultiFilePickerComponent implements ControlValueAccessor {
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

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.srcs));
    }

    add() {
        this.srcs.push('');
    }

    remove(i) {
        this.srcs.splice(i, 1);
        this.OnChange();
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerModule } from './file-picker.module';

@NgModule({
    imports: [FormsModule, CommonModule, FilePickerModule],
    declarations: [MultiFilePickerComponent],
    exports: [MultiFilePickerComponent]
})
export class MultiFilePickerModule {

}
