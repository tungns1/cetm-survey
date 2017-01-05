import { Component, ElementRef, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { EventEmitter, Output, ViewChild, SimpleChange } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

interface FlatPickrOptions {
    clickOpen?: boolean;
    allowInput?: boolean;
    dateFormat?: string;
    defaultDate?: string | Date;
}

declare class Flatpickr {
    constructor(el: HTMLElement, options?: FlatPickrOptions);
    open();
    setDate(d: Date);
    selectedDates: Date[];
}


const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
};

// A simple change event emitted by the MdCheckbox component.
class DatePickerChange {
    source: DatePickerComponent;
    value: Date;
}

const noop = function () {

}

const datePickerOptions: FlatPickrOptions = {
    allowInput: true,
    clickOpen: true,
    defaultDate: new Date(),
}

@Component({
    selector: 'date-picker',
    template: `<input style="width:45%;" #input [disabled]="disabled" [required]="required" (change)="_handleChange($event)" (blur)="_handleChange($event)" >`,
    providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR],
    styleUrls: ['flatpickr.material_green.min.css'],
    encapsulation: ViewEncapsulation.None
})
class DatePickerComponent implements ControlValueAccessor {
    ngAfterViewInit() {
        const options = Object.assign({}, datePickerOptions, { defaultDate: this._value });
        this.picker = new Flatpickr(this._inputElement.nativeElement, datePickerOptions);
        this.picker.setDate(this._value);
    }


    private picker: Flatpickr;

    private _value: Date = new Date();

    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;


    /** Set focus on input */
    focus() {
        this._inputElement.nativeElement.focus();
        this.picker.open();
    }

    _handleChange(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        const d = this.picker.selectedDates[0];
        this._value = d;
        this._onChangeCallback(this._value);
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



import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [DatePickerComponent],
    imports: [CommonModule, FormsModule],
    exports: [DatePickerComponent],
})
export class DatePickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DatePickerModule,
            providers: []
        };
    }
}
