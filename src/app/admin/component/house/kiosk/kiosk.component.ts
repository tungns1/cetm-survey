import { Component, ViewChild, Injector } from '@angular/core';
import { CenterService, HouseService, IKiosk, CacheBranch } from '../../../service/';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';
import { extend } from 'lodash';

@Component({
    selector: 'house-kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.scss']
})
export class KioskComponent extends BaseAdminComponent<IKiosk> {

    constructor(
        injector: Injector,
        private center: CenterService,
        private house: HouseService
    ) {
        super(injector, house.KioskService);
    }

    kiosks = this.house.KioskService.RxUpperList;
    services = this.center.ServiceService.RxListView;
    layouts = this.center.LayoutService.GetByType('kiosk');
    ticketlayouts = this.center.TicketLayoutService.GetAll();

    getLayout(id: string) {
        return this.layouts.map(layouts => layouts.find(l => l.id === id));
    }


    makeForm(b?: IKiosk) {
        b = b || <any>{};
        return this.center.LayoutService.GetByID(b.layout_id).map(layout => {
            b.layout_resources = extend({}, layout.ui.resources, layout.resources, b.layout_resources);
            return (new FormBuilder).group({
                id: [b.id],
                code: [b.code, Validators.required],
                name: [b.name, Validators.required],
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

