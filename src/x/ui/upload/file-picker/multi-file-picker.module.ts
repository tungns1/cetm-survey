import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
        <div *ngFor="let c of form.controls; let i = index;" >
            <file-picker [formControl]="c" (change)="OnChange()"></file-picker>
            <span (click)="remove(i)"> X </span>
        </div>
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
    providers: [MULTI_FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
class MultiFilePickerComponent implements ControlValueAccessor {
    protected form = new FormArray([]);
    protected onChangeCallback = (v) => { };

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.form = new FormArray(data.map(d => new FormControl(d)));
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.form.value));
    }

    add() {
        this.form.push(new FormControl(''));
    }

    remove(i) {
        this.form.removeAt(i);
        this.OnChange();
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerModule } from './file-picker.module';

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, FilePickerModule],
    declarations: [MultiFilePickerComponent],
    exports: [MultiFilePickerComponent]
})
export class MultiFilePickerModule {

}
