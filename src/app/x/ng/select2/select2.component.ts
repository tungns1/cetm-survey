import { Component, ElementRef, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ChangeDetectionStrategy, EventEmitter, Output, ViewChild, Attribute, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'select2';

export const SELECT2_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Select2Component),
    multi: true
};


const noop = function () {

}


@Component({
    
    selector: 'select2',
    templateUrl: 'select2.component.html',
    providers: [SELECT2_CONTROL_VALUE_ACCESSOR],
    styleUrls: ['select2.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Select2Component implements ControlValueAccessor {
    constructor(
        @Attribute('idField') private idField = 'id',
        @Attribute('textField') private textField = 'text') {

    }


    ngOnDestroy() {
        this.picker.select2('destroy');
    }


    private picker: JQuery;
    private _value: string | string[];
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;


    _handleChange() {
        this._value = this.typeConversion(this.picker.val());
        this._onChangeCallback(this._value);
    }

    private typeConversion(val: any) {
        switch (this.type) {
            case 'number':
                return +val;
            default:
                return val;
        }
    }

    @ViewChild('input') _inputElement: ElementRef;

    ngOnChanges(changes) {
        if (changes.data) {
            this.refresh();
        }
    }


    refresh() {
        if (!this.picker) {
            this.picker = $(this._inputElement.nativeElement).select2(this.makeOptions());
            this.picker.on('select2:select', e => this._handleChange());
            this.picker.on('select2:unselect', e => this._handleChange());
        }
        let ids = [].concat(this._value);
        this.search('', 0).forEach(v => {
            if (ids.indexOf(v.id) == -1) {
                return;
            }
            var $options = $('<option selected></option>').val(v.id).text(v.text);
            this.picker.append($options)
        })
        this.picker.trigger('change');
    }


    /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
    writeValue(value: any) {
        this._value = value;
        this.refresh();
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any) {
    }

    private makeOptions() {
        return <Select2Options>{
            placeholder: this.placeholder,
            multiple: this.multiple,
            width: "100%",
            ajax: <any>{
                dataType: 'json',
                transport: (params, success, failure) => {
                    let data = this.search(params.data.term, params.data.page);
                    success({
                        results: data,
                        pagination: {
                            more: false
                        }
                    });
                }
            }
        }
    }

    @Input() placeholder = "Vui lòng chọn";
    @Input() multiple;
    @Input() data: any[] = [];
    @Input() type: string = 'text';

    private search(term: string, page: number): IdTextPair[] {
        if (!Array.isArray(this.data)) {
            return [];
        }

        var res: IdTextPair[] = [];
        term = term || '';

        this.data.forEach(v => {
            let text: string = v[this.textField] || v.text || '';
            if (text.indexOf(term) != -1) {
                let id = v[this.idField];
                res.push({
                    id: typeof id == void 0 ? v.id : id,
                    text: text,
                })
            }
        });
        return res
    }
}



import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [Select2Component],
    imports: [CommonModule, FormsModule],
    exports: [Select2Component],
})
export class Select2Module {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Select2Module,
            providers: []
        };
    }
}
