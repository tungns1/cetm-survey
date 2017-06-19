import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SERVICE_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServiceConfigComponent),
    multi: true
}

interface IServiceConfig {
    basket?: string[];
}

import { CacheService } from '../../shared';

@Component({
    selector: 'service-config',
    template: `
        <div fxLayout="row">
            <div fxFlex="30%">
                <span i18n>Services</span>:
                <div class="border">
                <select-check [(ngModel)]="value.basket" (ngModelChange)="OnChange()" [data]="services$ | async" textField="name">
                </select-check>
                </div>
            </div>
        </div>
    `,
    providers: [SERVICE_CONTROL_VALUE_ACCESSOR]
})
export class ServiceConfigComponent implements ControlValueAccessor {

    private value: IServiceConfig = {};
    private services$ = CacheService.RxListView;

    private onChangeCallback = (v) => { };

    writeValue(v?: IServiceConfig) {
        v = v || {};
        v.basket = v.basket || [];
        this.value = v;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        console.log(this.value);
        this.onChangeCallback(this.value);
    }

}

import { SelectCheckModule } from '../../../../x/ng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        FormsModule, CommonModule,
        SelectCheckModule, FlexLayoutModule
    ],
    declarations: [ServiceConfigComponent],
    exports: [ServiceConfigComponent]
})
export class ServiceConfigModule {

}
