import { Component, ViewChild, Injector } from '@angular/core';
import {
    CenterService, HouseService, MetaService,
    CacheService,
    IKiosk, CacheBranch
} from '../../../service/';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';
import { extend } from 'lodash';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'house-kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.scss']
})
export class KioskComponent extends BaseAdminComponent<IKiosk> {

    constructor(
        injector: Injector,
        private center: CenterService,
        private house: HouseService,
        private meta: MetaService
    ) {
        super(injector, house.KioskService);
        this.layoutEditLink$.subscribe();
    }

    title = 'kiosk';

    kiosks = this.house.KioskService.RxUpperList;
    services = this.center.ServiceService.RxListView;
    layouts = this.center.LayoutService.GetByType('kiosk');
    ticketlayouts = this.center.TicketLayoutService.GetAll();

    layoutEditLink$ = this.formValue$.map(kiosk => {
        return `/admin/center/layout/${kiosk.layout_id}`;
    });

    getLayout(layout_id?: string) {
        return layout_id ? this.center.LayoutService.GetByID(layout_id) : of(null);
    }

    services$ = this.formValue$.map(form => form.branch_id)
        .distinctUntilChanged()
        .switchMap(branch_id => {
            return this.meta.BranchConfigService.GetByBranch([branch_id]);
        }).switchMap(configs => {
            return this.formValue$.map(form => {
                // ensure selected services in the config list
                const selected = (form.services || []).map(s => s.id);
                const services = CacheService.RxListView.value;
                console.log(services);
                const c = configs[0];
                if (!c || !c.service || !c.service.basket || c.service.basket.length < 1) return services;
                const ids = [].concat(selected).concat(c.service.basket);
                return services.filter(s => {
                    return ids.indexOf(s.id) !== -1;
                });
            });
        }).share().publishReplay(1).refCount();

    makeForm(b?: IKiosk) {
        b = b || <any>{};
        return this.getLayout(b.layout_id).map(layout => {
            if (layout) {
                b.layout_resources = extend({}, layout.ui.resources, layout.resources, b.layout_resources);
                Object.keys(b.layout_resources).forEach(name => {
                    const show = !!layout.ui.resources[name];
                    b.layout_resources[name].show = show;
                });
            }
            return (new FormBuilder).group({
                id: [b.id],
                code: [b.code, CommonValidator.Code],
                name: [b.name, CommonValidator.Name],
                services: [b.services],
                branch_id: [b.branch_id, Validators.required],
                vcodes: [b.vcodes],
                layout_id: [b.layout_id],
                tlayout_id: [b.tlayout_id],
                parent_id: [b.parent_id],
                inheritable: [b.inheritable],
                layout_resources: [b.layout_resources]
            });
        });
    }
}

