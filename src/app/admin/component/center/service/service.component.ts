import { Component, Injector } from '@angular/core';
import { CenterService, IService, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';

@Component({
    selector: 'admin-service',
    templateUrl: 'service.component.html',
    styleUrls: ['service.component.scss']
})
export class ServiceComponent extends BaseAdminComponent<IService> {
    constructor(
        injector: Injector,
        private org: CenterService
    ) {
        super(injector, org.ServiceService);
    }

    title = 'service';
    makeForm(b?: IService) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            tform_normal: [b.tform_normal, Validators.required],
            tform_vip: [b.tform_vip, Validators.required],
            image: [b.image],
            code: [b.code, CommonValidator.Code],
            l10n: [b.l10n],
            priority: [b.priority, Validators.required],
            // call_for_vip: [b.call_for_vip]
        });
    }

    tforms = this.org.TFormService.RxListView;
    tformVips = this.org.TFormService.RxListView;
    private roles = AllRoles;
}

