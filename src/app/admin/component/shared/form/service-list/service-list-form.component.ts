import {
    Component, Input, forwardRef,
    ExistingProvider, Attribute, OnInit,
    Optional, Inject, ViewChild
} from '@angular/core';
import {
    FormsModule, ControlValueAccessor,
    NG_VALUE_ACCESSOR, AbstractControl,
    FormArray, FormControl
} from '@angular/forms';
import { MdDialog, MdDialogConfig, MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { IService, AddServiceName } from '../../../../../shared/model';

const SERVICE_LIST_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServiceListComponent),
    multi: true
}

import {
    IServiceCustomizeData, ServiceCustomizeModal,
    IServiceCustomizeResult
} from './service-customer.component';

@Component({
    selector: 'service-list',
    templateUrl: 'service-list.form.html',
    styleUrls: ['service-list.form.scss'],
    providers: [SERVICE_LIST_CONTROL_VALUE_ACCESSOR]
})

export class ServiceListComponent implements ControlValueAccessor {

    constructor(
        private dialog: MdDialog
    ) { }

    @Input() services: IService[] = [];
    protected value: IService[] = [];

    protected onChangeCallback = (v) => { };
    private active: IService = null;

    Add() {
        this.Edit(this.value.length);
    }

    Edit(index: number, d?: IService) {
        const config = new MdDialogConfig();
        config.width = '450px';
        config.data = <IServiceCustomizeData>{
            index: index,
            active: d,
            services: this.services,
            used: this.value
        };
        const dialog = this.dialog.open(ServiceCustomizeModal, config);
        dialog.afterClosed().subscribe((v: IServiceCustomizeResult) => {
            if (!v || v.action == 'cancel') return;
            if (!v || v.action == 'save') {
                this.value[v.index] = v.active;
                AddServiceName(v.active);
            } else if (!v || v.action == 'delete') {
                this.value.splice(v.index, 1);
            }
            this.OnChange();
        });
    }

    writeValue(data: IService[]) {
        if (!Array.isArray(data)) {
            data = [];
        }
        this.value = data;
        this.value.forEach(AddServiceName);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.value));
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
