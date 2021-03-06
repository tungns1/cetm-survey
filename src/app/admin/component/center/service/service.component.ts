import { Component, Injector } from '@angular/core';
import { CenterService, IService, AllRoles, BaseAdminComponent, CommonValidator } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

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

    tforms = this.org.TFormService.RxListView;
    tformVips = this.org.TFormService.RxListView;
    private roles = AllRoles;

    makeForm(b?: IService) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            tform_normal: [b.tform_normal, Validators.required],
            tform_vip: [b.tform_vip],
            image: [b.image],
            code: [b.code, CommonValidator.Code],
            l10n: [b.l10n],
            attrs: [b.attrs]
        });
    }
}
