
import { Component, Injector } from '@angular/core';
import { CenterService, HouseService, ICounter, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

@Component({
    selector: 'house-counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.scss']
})
export class CounterComponent extends BaseAdminComponent<ICounter> {
    constructor(
        injector: Injector,
        private house: HouseService,
        private org: CenterService
    ) {
        super(injector, house.CounterService);
    }

    services = this.org.ServiceService.RxListView;
    makeForm(b?: ICounter) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, Validators.required],
            name: [b.name, Validators.required],
            cnum: [b.cnum, Validators.required],
            dev_addr: [b.dev_addr],
            services: [b.services, Validators.required],
            vservices: [b.vservices],
            branch_id: [b.branch_id, Validators.required]
        });
    }

}


