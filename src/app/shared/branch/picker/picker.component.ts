import { Component, ElementRef, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CacheBranch } from '../../model';
import { BranchFilterService } from '../filter';
import { switchMap, map } from 'rxjs/operators';

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
        <select [(ngModel)]="selected" [disabled]="disabled" (ngModelChange)="onChangeCallback($event)" > // value is a string or number
            <option *ngFor="let opt of branches$ | async" [value]="opt.id">{{opt.name}}</option>
        </select>
    ` ,
    styles: [`
    select{
        width: 100%;
        border-radius: 3px;
        height: 25px;
        margin-bottom: 10px;

    }`],
    providers: [BRANCH_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class BranchPickerComponent implements ControlValueAccessor {
    constructor(
        private branchFilterService: BranchFilterService
    ) { }

    @Input() scope: string = 'global';

    protected branches$ = this.branchFilterService.Data$.pipe(switchMap(filter => {
        const ids = this.branchFilterService.getAllID();
        return CacheBranch.RxListView.pipe(map(branches => {
            return branches.filter(b => ids.indexOf(b.id) !== -1);
        }));
    }));
    protected selected = '';
    private onChangeCallback = (v: string) => { };
    protected disabled = false;

    ngOnInit(){
        // console.log('aaaaaaaaaaaaaaaaaa');
        // console.log(this.scope);
    }

    setDisabledState?(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

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
