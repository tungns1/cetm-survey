import { Component } from '@angular/core';
import { Service, Center } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

export function NewServiceForm(b?: Model.IService) {
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
    templateUrl: 'service.component.html'
})
export class ServiceComponent {

    service: Editor.IEditService<Model.IService> = {
        api: Service.Api,
        form: NewServiceForm,
        refresh: () => this.data.refresh()
    };

    data = Service.AutoRefresh();
    tforms = Center.TForm.AutoRefresh();
    
    fields = [
        { title: 'Tên dịch vụ', name: 'name' },
    ]
}

