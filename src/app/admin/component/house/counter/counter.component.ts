import { Component, Injector, OnInit } from '@angular/core';
import { CenterService, HouseService, ICounter, AllRoles, CacheBranch } from '../../shared/';
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

    title = 'counter';
    storeLevel0$ = CacheBranch.RxByLevel(0);

    OnInit(){
        // this.makeForm();
    }

    services = this.org.ServiceService.RxListView;
    pattern_code: any ="^[a-zA-Z][a-zA-Z0-9-_]{5,19}$";
    makeForm(b?: ICounter) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, Validators.compose([Validators.required, Validators.pattern(this.pattern_code)])],
            name: [b.name, Validators.required],
            cnum: [b.cnum, Validators.required],
            dev_addr: [b.dev_addr],
            services: [b.services, Validators.required],
            vservices: [b.vservices],
            branch_id: [b.branch_id, Validators.required]
        });
    }
}


