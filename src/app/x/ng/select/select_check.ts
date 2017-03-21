import { Component, Input, forwardRef, ExistingProvider, Attribute,OnChanges } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';
import { TranslateService } from '../../i18n/translate.service';


const SELECT_CHECK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectCheckComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'select-check',
    template: `
    <div class="scroll-filter">
        <div *ngIf="canCheckAll" class="hlft-div-checkbox" >
            <div *ngIf="isAll">
                <label translate><input type="checkbox" (change)="checkAll()" checked>LANGAUGE_CHOOSE_ALL</label><br>
            </div>
              <div *ngIf="!isAll">
                <label translate><input type="checkbox" (change)="checkAll()" >LANGAUGE_CHOOSE_ALL</label><br>
            </div>
        </div>
        <div *ngFor="let d of data" class="hlft-div-checkbox pointer">
            <label ><input type="checkbox"  [(ngModel)]="values[d[idField]]" (change)="check(d, $event)">{{d[textField]}}</label><br>
        </div>
    </div>
    `,
    providers: [SELECT_CHECK_CONTROL_VALUE_ACCESSOR]
})
export class SelectCheckComponent implements ControlValueAccessor,OnChanges {
    constructor(
        @Attribute('idField') private idField,
        @Attribute('textField') private textField) {
        this.idField = this.idField || 'id';
        this.textField = this.textField || 'text';
    }

    @Input() data = [];
    ngOnInit() {
        this.isAll = false;
    }
    ngOnChanges(changes) {
        if (changes.data) {
            this.isAll = false;
        }
    }

    get canCheckAll() {
        return this.data && this.data.length > 1;
    }

    isAll: boolean;
    private values = {};
    protected value = [];
    protected onChangeCallback = (v) => { };

    checkAll() {
        this.isAll = !this.isAll;
        if (this.isAll) {
            this.writeValue(this.data.map(d => d[this.idField]));
        } else {
            this.writeValue([]);
        }

        this.OnChange();
    }

    writeValue(data: any[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.value = data;
        this.values = {};
        this.value.forEach(id => this.values[id] = true);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.value));
    }

    check(d: any, e: Event) {
        let id = d[this.idField];
        e.preventDefault();
        e.stopPropagation();
        let b = e.target['checked'];

        if (b) {
            this.value.push(id);
        } else {
            const index = this.value.indexOf(id);
            if (index !== -1) {
                this.value.splice(index, 1);
            }
        }

        this.OnChange();
    }

}
