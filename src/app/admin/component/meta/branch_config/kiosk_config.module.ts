import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
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
        <div *ngFor="let el of workingTime; let i = index" fxLayout="row" fxLayoutGap="10px">
            <h3 fxFlex="10">Start</h3>
            <span fxFlex="10" class="center">{{el.start}}</span>
            <button fxFlex (click)="openStartTimePicker(i)">Choose Time</button>
            <h3 fxFlex="10">End</h3>
            <span fxFlex="10" class="center">{{el.end}}</span>
            <button fxFlex (click)="openEndTimePicker(i)">Choose Time</button>
            <i fxFlex="5%" class="fa fa-times fa-2x pointer center" (click)="removePeriod(i)"> </i>
        </div>
        <i class="fa fa-plus" (click)="addPeriod()"></i>
    `,
    providers: [KIOSK_CONTROL_VALUE_ACCESSOR]
})
export class KioskConfigComponent implements ControlValueAccessor {
    constructor(
        private atp: AmazingTimePickerService
    ) { }
    protected value: IKioskConfig = {
        max_ticket: -1,
        time_work_in_day: []
    }
    private workingTime = [];

    private onChangeCallback = (v) => { };

    writeValue(v: any) {
        this.value = v || {};
        this.workingTime = this.value.time_work_in_day.map(el => {
            let start = new Date(el.time_start).getHours() + ':' + new Date(el.time_start).getMinutes();
            let end = new Date(el.time_end).getHours() + ':' + new Date(el.time_end).getMinutes();
            // console.log(el.time_start)
            // console.log(el.time_end)
            return { start: start, end: end };
        })
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        // console.log(this.value)
        this.onChangeCallback(this.value);
    }

    addPeriod() {
        this.workingTime.push({ start: null, end: null })
        this.value.time_work_in_day.push({ time_start: null, time_end: null });
        this.OnChange();
    }

    removePeriod(index) {
        this.workingTime.splice(index, 1);
        this.value.time_work_in_day.splice(index, 1);
        this.OnChange();
    }

    openStartTimePicker(index: number) {
        const timePicker = this.atp.open();
        timePicker.afterClose().subscribe(time => {
            // console.log(time);
            this.workingTime[index].start = time;
            let hour: number = Number.parseInt(time.split(':')[0]);
            let minute: number = Number.parseInt(time.split(':')[1]);
            this.value.time_work_in_day[index].time_start = new Date().setHours(hour, minute, 0, 0);
            this.OnChange();
        });
    }

    openEndTimePicker(index: number) {
        const timePicker = this.atp.open();
        timePicker.afterClose().subscribe(time => {
            // console.log(time);
            this.workingTime[index].end = time;
            let hour: number = Number.parseInt(time.split(':')[0]);
            let minute: number = Number.parseInt(time.split(':')[1]);
            this.value.time_work_in_day[index].time_end = new Date().setHours(hour, minute, 0, 0);
            this.OnChange();
        });
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SharedModule } from '../../shared';

@NgModule({
    imports: [
        FormsModule, CommonModule, AmazingTimePickerModule,
        SharedModule
    ],
    declarations: [KioskConfigComponent],
    exports: [KioskConfigComponent]
})
export class KioskConfigModule {

}
