import { Component } from '@angular/core';
import { Center } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

export function NewServiceForm(b?: Model.Center.IService) {
    b = b || <any>{};
    return (new FormBuilder).group({
        id: [b.id],
        tform_normal: [b.tform_normal, Validators.required],
        tform_vip: [b.tform_vip],
        image: [b.image],
        code: [b.code],
        l10n: [b.l10n],
        priority: [b.priority]
    });
}

@Component({
    selector: 'admin-service',
    templateUrl: 'service.component.html',
    styleUrls: ['service.component.css']
})
export class ServiceComponent {
    constructor(
        private serviceApi: Center.Service.ServiceApi,
        private tformApi: Center.TForm.TFormApi
    ) { }

    service: Editor.IEditService<Model.Center.IService> = {
        api: this.serviceApi,
        form: NewServiceForm,
        refresh: () => this.data.refresh()
    };

    data = this.serviceApi.AutoRefresh();
    tforms = this.tformApi.AutoRefresh();
    tformVips = this.tformApi.AutoRefresh();

    fields = [
        { title: 'LABEL_NAME_SERVICE', name: 'name' },
    ]
}

