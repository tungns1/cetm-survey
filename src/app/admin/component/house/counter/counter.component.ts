import { Component, Injector, OnInit } from '@angular/core';
import {
    CenterService, HouseService, MetaService,
    CacheService, CacheBranch,
    ICounter, AllRoles
} from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';

@Component({
    selector: 'house-counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.scss']
})
export class CounterComponent extends BaseAdminComponent<ICounter> {
    constructor(
        injector: Injector,
        private meta: MetaService,
        private house: HouseService,
        private org: CenterService
    ) {
        super(injector, house.CounterService);
        this.services$.subscribe();
    }

    storeLevel0$ = CacheBranch.RxByLevel(0);

    services$ = this.formValue$.map(form => form.branch_id)
        .distinctUntilChanged()
        .switchMap(branch_id => {
            return this.meta.BranchConfigService.GetByBranch([branch_id]);
        }).switchMap(configs => {
            return this.formValue$.map(form => {
                // ensure selected service is in the list
                const selected = form.services;
                const services = CacheService.RxListView.value;
                const c = configs[0];
                if (!c || !c.service || !c.service.basket || c.service.basket.length < 1) return services;
                const ids = [].concat(selected).concat(c.service.basket);
                return services.filter(s => {
                    return ids.indexOf(s.id) !== -1;
                });
            });
        });

    makeForm(b?: ICounter) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, CommonValidator.Code],
            name: [b.name, CommonValidator.Name],
            cnum: [b.cnum, Validators.required],
            dev_addr: [b.dev_addr],
            services: [b.services, Validators.required],
            vservices: [b.vservices],
            branch_id: [b.branch_id, Validators.required]
        });
    }
}


