import { Component, Injector } from '@angular/core';
import {
    CenterService, HouseService, MetaService,
    CacheService, IKiosk
} from '../../../service/';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseAdminComponent, CommonValidator, USER_ROLES, RuntimeEnvironment } from '../../shared';
import { extend } from 'lodash';
import { of } from 'rxjs';
import { distinctUntilChanged, share, publishReplay, refCount, map, switchMap } from 'rxjs/operators';

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
        private meta: MetaService,
        private env: RuntimeEnvironment
    ) {
        super(injector, house.KioskService);
        this.layoutEditLink$.subscribe();
    }

    kiosks = this.house.KioskService.RxUpperList;
    services = this.center.ServiceService.RxListView;
    layouts = this.center.LayoutService.GetByType('kiosk');
    ticketlayouts = this.center.TicketLayoutService.GetAll();

    layoutEditLink$ = this.formValue$.pipe(map(kiosk => {
        return `/admin/center/layout/${kiosk.layout_id}`;
    }));

    isAdminStandard$ = this.env.Auth.User$.pipe(map(u =>
        u.role.indexOf(USER_ROLES.ADMIN_STANDARD) !== -1
    ));

    services$ = this.formValue$.pipe(
        map(form => form.branch_id),
        distinctUntilChanged(),
        switchMap(branch_id => {
            return this.meta.BranchConfigService.GetByBranch([branch_id]);
        }),
        switchMap(configs => {
            return this.formValue$.pipe(map(form => {
                // ensure selected services in the config list
                const selected = (form.services || []).map(s => s.id);
                const services = CacheService.RxListView.value;
                const c = configs[0];
                if (!c || !c.service || !c.service.basket || c.service.basket.length < 1) return services;
                const ids = [].concat(selected).concat(c.service.basket);
                return services.filter(s => {
                    return ids.indexOf(s.id) !== -1;
                });
            }));
        }), share(), publishReplay(1), refCount());

    getLayout(layout_id?: string) {
        return layout_id ? this.center.LayoutService.GetByID(layout_id) : of(null);
    }

    makeForm(b?: IKiosk) {
        b = b || <any>{};
        // console.log(b)
        return this.getLayout(b.layout_id).pipe(map(layout => {
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
                branch_id: [{ value: b.branch_id, disabled: !!b.id }, Validators.required],
                is_group: [b.is_group || false],
                vcodes: [b.vcodes],
                layout_id: [b.layout_id],
                tlayout_id: [b.tlayout_id],
                parent_id: [b.parent_id],
                inheritable: [b.inheritable],
                layout_resources: [b.layout_resources]
            });
        }));
    }
}

