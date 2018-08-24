import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CenterService, IServiceGroup, CommonValidator, BaseAdminComponent } from '../../shared';

@Component({
    selector: 'app-service-group',
    templateUrl: './service-group.component.html',
    styleUrls: ['./service-group.component.scss']
})
export class ServiceGroupComponent extends BaseAdminComponent<IServiceGroup> {
    constructor(
        injector: Injector,
        private org: CenterService
    ) {
        super(injector, org.ServiceGroupService);
    }

    tforms = this.org.TFormService.RxListView;
    tformVips = this.org.TFormService.RxListView;

    makeForm(b?: IServiceGroup) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, CommonValidator.Code],
            l10n: [b.l10n],
            attrs: [b.attrs]
        });
    }
}
