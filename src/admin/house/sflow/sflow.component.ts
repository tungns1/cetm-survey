import { Component } from '@angular/core';
import { House, Center } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';

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

    service: Editor.IEditService<Model.House.ISFlow> = {
        api: House.SFlow.Api,
        form: NewSFlowForm,
        refresh: () => this.data.refresh()
    };

    data = House.SFlow.AutoRefresh();
    services = Center.Service.GetAll();
    tforms = Center.TForm.AutoRefresh();
    tformVips = Center.TForm.AutoRefresh();

    fields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_ID_SERVICE', name: 'service_id' },
    ]
}

