import { MdDialog, MdDialogConfig, MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, Optional, Inject, OnInit } from '@angular/core';
import { IService, ServiceName } from '../../../../../shared/model';
import { ServiceListComponent } from './service-list-form.component';

export interface IServiceCustomizeData {
    index: number;
    active?: IService;
    services: IService[];
    used: IService[];
}

export interface IServiceCustomizeResult {
    action: 'save' | 'cancel' | 'delete';
    index: number;
    active: IService;
}

@Component({
    selector: 'service-customize',
    templateUrl: 'service-customize.component.html'
})
export class ServiceCustomizeModal {
    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) private dialogData: IServiceCustomizeData,
        private dialog: MdDialogRef<ServiceCustomizeModal>,
        // private serviceListComponent: ServiceListComponent
    ) {
        this.active = this.dialogData.active || <any>{};
        const used_services: IService[] = this.dialogData.used || <any>[];
        this.selectable_services = this.dialogData.services.filter(s => {
            return s.id == this.active.id || !used_services.find(v => s.id === v.id);
        });
    }


    protected active: IService;
    private index = this.dialogData.index;
    protected selectable_services: IService[];

    setActive() {
        let service = this.selectable_services.find(s => s.id === this.active.id);
        if (service) {
            this.active.l10n = service.l10n;
            this.active.code = service.code;
        }
    }

    Save() {
        this.sendResult("save");
    }

    Remove() {
        this.sendResult("delete");
    }

    close() {
        this.sendResult("cancel");
    }

    private sendResult(action: "cancel" | "delete" | "save") {
        this.dialog.close(<IServiceCustomizeResult>{
            action: action,
            active: this.active,
            index: this.index
        })
    }
}