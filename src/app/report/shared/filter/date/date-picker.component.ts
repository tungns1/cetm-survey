import { Component, ElementRef, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { EventEmitter, Output, ViewChild, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';

const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
};

const noop = function () {

}
const datePickerOptions: FlatPickrOptions = {
    allowInput: true,
    clickOpen: true,
    defaultDate: new Date(),
}

@Component({
    selector: 'date-picker',
    template: `
        <input style="width:80%;" #input 
        [disabled]="disabled" [required]="required" 
        (change)="onChange($event)"
        (blur)="onBlur($event)"
        style="background: url(../../../../assets/img/icon/calendar.png) no-repeat scroll 75px 7px;
                width: 85%;">
    `,
    providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR],
    styleUrls: ['material_green.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements ControlValueAccessor {
    ngAfterViewInit() {
        const options = Object.assign({}, datePickerOptions, { defaultDate: this._value });
        this.picker = new Flatpickr(this._inputElement.nativeElement, datePickerOptions);
        this.picker.setDate(this._value);
    }


    private picker: Flatpickr;

    private _value: Date = new Date();

    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;

    onBlur(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        const d = this.picker.selectedDates[0];
        // refresh the view
        this.picker.setDate(d);
    }

    onChange(event: Event) {
        event.preventDefault();
        const d = this.picker.selectedDates[0];
        this._onChangeCallback(d);
    }

    @ViewChild('input') _inputElement: ElementRef;


    /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
    writeValue(value: Date) {
        this._value = value;
        if (this.picker) {
            this.picker.setDate(this._value);
        }
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

}


