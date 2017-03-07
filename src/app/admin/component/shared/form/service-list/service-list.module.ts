import { Component, Input, forwardRef, ExistingProvider, Attribute } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';
import { SharedService } from '../../../../shared';

const SERVICE_LIST_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServiceListComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';
import { Model, Lib } from '../../../../shared';
import { ViewChild } from '@angular/core';
import {CultureModule} from '../i18n-form';
import {JSONFormModule} from '../json-form';

type IServiceList = Model.Center.IService[];

@Component({
    selector: 'service-list',
    templateUrl: 'service-list.form.html',
    styleUrls: ['service-list.form.css'],
    providers: [SERVICE_LIST_CONTROL_VALUE_ACCESSOR]
})
class ServiceListComponent implements ControlValueAccessor {

    @Input() services: IServiceList = [];
    @ViewChild(Lib.Ng.ModalComponent) modal: Lib.Ng.ModalComponent;

    protected value: IServiceList = [];
    protected onChangeCallback = (v) => { };
    private active: Model.Center.IService = null;

    writeValue(data: IServiceList) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.value = data;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.value));
    }

    Edit(d: Model.Center.IService) {
        this.active = d;
        this.modal.Open();
    }

    Add() {
        this.active = <any>{};
        this.modal.Open();
    }

    Close() {
        this.modal.Close();
    }

    Save() {
        if (this.value.indexOf(this.active) < 0) {
            this.value.push(this.active);
        }
        this.OnChange();
        this.modal.Close();
    }

    Remove() {
        let i = this.value.indexOf(this.active);
        if (i > -1) {
            this.value.splice(i, 1);
        }
        this.active = null;
        this.OnChange();
        this.modal.Close();
    }

    setActive() {
        let service = this.services.find(s => s.id === this.active.id);
        if (service) {
            this.active.l10n = service.l10n;
            this.active.code = service.code;
        }
    }

    getName(service_id: string) {
        return Model.Center.ServiceName(service_id);
    }

    Swap(i: number, j: number) {
        // only allow i < j to simplify logic
        if (i > j || i < 0 || j > this.value.length - 1) {
            return;
        }
        const v = this.value[i];
        this.value[i] = this.value[j];
        this.value[j] = v;
        this.OnChange();
    }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule, CommonModule,
        CultureModule, JSONFormModule,
        Lib.Ng.ModalModule,SharedService.I18n.TranslateModule
    ],
    declarations: [ServiceListComponent],
    exports: [ServiceListComponent]
})
export class ServiceListModule {

}
