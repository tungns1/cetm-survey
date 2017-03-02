import { Component } from '@angular/core';
import { Center } from '../../../service/';
import { Branch, Model } from '../../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'admin-service',
    templateUrl: 'service.component.html',
    styleUrls: ['service.component.css']
})
export class ServiceComponent {
    constructor(
        private center: Center.CenterService
    ) { }

    service = this.center.ServiceService;

    makeForm(b?: Model.Center.IService) {
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

    tforms = this.center.TFormService.RxListView;
    tformVips = this.center.TFormService.RxListView;

    fields = [
        { title: 'LABEL_NAME_SERVICE', name: 'name' },
    ]
}

