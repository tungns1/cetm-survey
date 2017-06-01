import { MdDialog, MdDialogConfig, MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, Optional, Inject, OnInit } from '@angular/core';
import { IService, ServiceName } from '../../../../../shared/model';
import { ServiceListComponent } from './service-list-form.component';
import { Toast } from '../../../../../x/ui/noti/toastr';

export interface IServiceCustomizeData {
    index: number;
    active?: IService;
    services: IService[];
    value: IService[];
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
    ) { }

    private active: IService = this.dialogData.active || <any>{};
    private services = this.dialogData.services;
    private index = this.dialogData.index;
    private value = this.dialogData.value || <any>[];
    private toast = new Toast;
    // private value: IService[] = this.serviceListComponent.getValue();
    // ngOnInit(){
    //     console.log(ServiceName);
    // }

    setActive() {
        let service = this.services.find(s => s.id === this.active.id);
        if (service) {
            this.active.l10n = service.l10n;
            this.active.code = service.code;
        }
    }

    Save() {
        let check = 0;
        for(let i = 0 ; i < this.value.length; i++) {
            if(this.value[i].id == this.active.id) {
                check = 1;
                break;
            }
        }
        if(check == 0) {
            this.sendResult("save");
        }
        else {
            this.toast.Title('error').Info("Service is exist").Show();
        }
      
        
    }

    Remove() {
        this.sendResult("delete");
    }

    close() {
        this.sendResult("cancel");
    }

    private sendResult(action: string) {
        this.dialog.close(<IServiceCustomizeResult>{
            action: action,
            active: this.active,
            index: this.index
        })
    }
}