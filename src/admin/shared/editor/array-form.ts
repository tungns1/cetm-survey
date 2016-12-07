import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';


const ARRAY_FORM_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ArrayFormComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'arr-form',
    template: `
        <span (click)="add()">Thêm</span>        
        <div *ngFor="let c of form.controls; let i = index;" >
            <input [formControl]="c" (change)="OnChange()" /> <span (click)="remove(i)"> X </span>
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
    providers: [ARRAY_FORM_CONTROL_VALUE_ACCESSOR]
})
class ArrayFormComponent implements ControlValueAccessor {
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

@NgModule({
    imports: [ReactiveFormsModule, CommonModule],
    declarations: [ArrayFormComponent],
    exports: [ArrayFormComponent]
})
export class ArrayFormModule {

}
