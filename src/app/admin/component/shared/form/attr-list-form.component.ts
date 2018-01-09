import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';


const ATTRIBUTE_LIST_FORM_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AttributeListFormComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

interface IAttribute {
    key: string;
    value: string;
}

@Component({
    selector: 'attr-list-form',
    template: `    
        <i class="fa fa-plus" (click)="add()">  </i>  
        <div  id="border1" fxLayout="column" fxLayoutGap="8px">
            <div *ngFor="let c of values; let i = index" >
                <div fxLayout="row" fxLayoutGap="8px">
                Key: 
                <input class="ctrlInput" style="width: 95%;" [(ngModel)]="values[i].key" (change)="onChange($event, i)" /> 
                Value:
                <input class="ctrlInput" style="width: 95%;" [(ngModel)]="values[i].value" (change)="onChange($event, i)" /> 
                <i class="fa fa-trash pointer" (click)="remove(i)"> </i>
                </div>
            </div>    
        </div>
    `,
    styleUrls:["./attr-list-form.component.scss"],
    providers: [ATTRIBUTE_LIST_FORM_CONTROL_VALUE_ACCESSOR]
})
export class AttributeListFormComponent implements ControlValueAccessor {
    protected values: IAttribute[] = [];
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
        this.refresh();
    }

    add() {
        this.values.push({key: '', value: ''});
        this.refresh();
    }

    remove(i) {
        this.values.splice(i, 1);
        this.refresh();
    }
}
