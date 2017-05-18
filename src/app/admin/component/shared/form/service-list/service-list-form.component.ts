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
import { MdDialog, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../../../../shared';
import { IService, ServiceName } from '../../../../../shared/model';

const SERVICE_LIST_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServiceListComponent),
    multi: true
}

type IServiceList = IService[];

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

    @Input() services: IServiceList = [];
    protected value: IServiceList = [];

    protected onChangeCallback = (v) => { };
    private active: IService = null;

    Add() {
        const config = new MdDialogConfig();
        config.width = '450px';
        config.data = {
            data: <any>{},
            services: this.services,
            value: this.value,
            parent: this
        };
        const dialog = this.dialog.open(ServiceListModal, config);
    }

    Edit(d: IService) {
        const config = new MdDialogConfig();
        config.width = '450px';
        config.data = {
            data: d,
            services: this.services,
            value: this.value,
            parent: this
        };
        const dialog = this.dialog.open(ServiceListModal, config);
    }

    getName(service_id: string) {
        return ServiceName(service_id);
    }

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

interface IServiceListModalData {
    data: IService,
    services: IServiceList,
    value: IServiceList;
    parent: ServiceListComponent;
}

@Component({
    selector: 'service-list-modal',
    templateUrl: 'service-list-modal.html',
    styleUrls: ['service-list.form.scss'],
})
export class ServiceListModal {

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) private dialogData: IServiceListModalData,
        private dialog: MdDialog,
    ) { }

    private active = this.dialogData.data;
    private services = this.dialogData.services;
    protected value = this.dialogData.value;
    private parent = this.dialogData.parent;


    setActive() {
        let service = this.services.find(s => s.id === this.active.id);
        if (service) {
            this.active.l10n = service.l10n;
            this.active.code = service.code;
        }
    }

    Save() {
        if (this.value.indexOf(this.active) < 0) {
            this.value.push(this.active);
        }
        this.parent.OnChange()
        this.dialog.closeAll();
    }

    Remove() {
        let i = this.value.indexOf(this.active);
        if (i > -1) {
            this.value.splice(i, 1);
        }
        this.parent.OnChange()
        this.dialog.closeAll();
    }

    close(){
        this.dialog.closeAll();
    }
}