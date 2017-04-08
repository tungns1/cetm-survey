import { Component, Injector } from '@angular/core';
import { CenterService, IService, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

@Component({
    selector: 'admin-service',
    templateUrl: 'service.component.html',
    styleUrls: ['service.component.css']
})
export class ServiceComponent extends BaseAdminComponent<IService> {
    constructor(
        injector: Injector,
        private org: CenterService
    ) {
        super(injector, org.ServiceService);
    }

    makeForm(b?: IService) {
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

    tforms = this.org.TFormService.RxListView;
    tformVips = this.org.TFormService.RxListView;
    private roles = AllRoles;
}

