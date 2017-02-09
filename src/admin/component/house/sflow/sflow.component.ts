import { Component } from '@angular/core';
import { House, Center } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

export function NewSFlowForm(b?: Model.House.ISFlow) {
    b = b || <any>{};
    return (new FormBuilder).group({
        id: [b.id],
        branch_id: [b.branch_id, Validators.required],
        service_id: [b.service_id, Validators.required],
        tform_normal: [b.tform_normal, Validators.required],
        tform_vip: [b.tform_vip]
    });
}

@Component({
    selector: 'admin-sflow',
    templateUrl: 'sflow.component.html'
})
export class SFlowComponent {

    constructor(
        private serviceApi: Center.Service.ServiceApi,
        private tformApi: Center.TForm.TFormApi,
        private sflowApi: House.SFlow.SFlowApi
    ) { }

    service: Editor.IEditService<Model.House.ISFlow> = {
        api: this.sflowApi,
        form: NewSFlowForm,
        refresh: () => this.data.refresh()
    };

    data = this.sflowApi.AutoRefresh();
    services = this.serviceApi.GetAll();
    tforms = this.tformApi.AutoRefresh();
    tformVips = this.tformApi.AutoRefresh();

    fields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_ID_SERVICE', name: 'service_id' },
    ]
}

