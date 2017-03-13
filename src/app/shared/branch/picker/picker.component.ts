import { Component, ElementRef, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Org } from '../../model';
import { BranchFilterService, BranchFilterModule } from '../filter';

const BRANCH_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BranchPickerComponent),
    multi: true
};

const noop = function () {

}

@Component({
    selector: 'branch-picker',
    template: `
        <select class="hl-select-picker" [(ngModel)]="selected" (ngModelChange)="onChangeCallback($event)" > // value is a string or number
            <option *ngFor="let opt of branches | async" [value]="opt.id">{{opt.name}}</option>
        </select>
    ` ,
    styles: [`
    select{
        width:150px;
        border-radius:3px;
        height:30px;

    }`],
    providers: [BRANCH_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class BranchPickerComponent implements ControlValueAccessor {
    constructor(
        private branchFilterService: BranchFilterService
    ) { }

    private branches = this.branchFilterService.ValueChanges.switchMap(filter => {
        const ids = filter.GetArrayBranchID();
        return Org.CacheBranch.RxListView.map(branches => {
            return branches.filter(b => ids.indexOf(b.id) !== -1);
        })
    });

    private selected = '';
    private onChangeCallback = (v: string) => { };

    /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
    writeValue(value: any) {
        // in value
        this.selected = value;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
        // out value
        this.onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any) {

    }
}
