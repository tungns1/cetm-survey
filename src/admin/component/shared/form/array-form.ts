import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
        <i class="fa fa-plus" (click)="add()" translate=""> BUTTON_ADD </i>        
        <div *ngFor="let c of values; let i = index;" >
            <input class="iput-fnews-hlm" [ngModel]="values[i]" (change)="onChange($event, i)" /> 
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
        width: 100%;
        display: inline;
    }
    .iput-fnews-hlm{
        width:95%;
    }
 `],
    providers: [ARRAY_FORM_CONTROL_VALUE_ACCESSOR]
})
class ArrayFormComponent implements ControlValueAccessor {
    protected values = [];
    protected onChangeCallback = (v) => { };

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.values = data;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    refresh() {
        setTimeout(_ => this.onChangeCallback(this.values));
    }

    onChange(event: Event, i: number) {
        event.preventDefault();
        event.stopPropagation();
        this.values[i] = event.target['value'];
        this.refresh();
    }

    add() {
        this.values.push('');
        this.refresh();
    }

    remove(i) {
        this.values.splice(i, 1);
        this.refresh();
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ArrayFormComponent],
    exports: [ArrayFormComponent]
})
export class ArrayFormModule {

}
