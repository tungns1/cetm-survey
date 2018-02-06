import { FormGroup, FormControl } from '@angular/forms';

import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IKioskConfig } from '../../../../shared/model';

const KIOSK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => KioskConfigComponent),
    multi: true
}

@Component({
    selector: 'kiosk-config',
    template: `
        <br>
        <span i18n>Max ticket per day</span>
        <input type="number" [(ngModel)]="value.max_ticket" (change)="OnChange()">
        <br>
        <h3>Working time</h3>
        <div *ngFor="let el of value.time_work_in_day">
            <span>Start</span>
            <input type="text" [(ngModel)]="el.time_start" (change)="OnChange()">
            <span>End</span>
            <input type="text" [(ngModel)]="el.time_end" (change)="OnChange()">
        </div>
    `,
    providers: [KIOSK_CONTROL_VALUE_ACCESSOR]
})
export class KioskConfigComponent implements ControlValueAccessor {
    protected value: IKioskConfig = {
        max_ticket: -1,
        time_work_in_day: []
    }

    private onChangeCallback = (v) => { };

    writeValue(v: any) {
        this.value = v || {};
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        this.value.time_work_in_day.forEach(workingPeriod => {
            workingPeriod.time_start = Number.parseInt(workingPeriod.time_start.toString());
            workingPeriod.time_end = Number.parseInt(workingPeriod.time_end.toString());
        })
        // console.log(this.value)
        this.onChangeCallback(this.value);
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [KioskConfigComponent],
    exports: [KioskConfigComponent]
})
export class KioskConfigModule {

}
