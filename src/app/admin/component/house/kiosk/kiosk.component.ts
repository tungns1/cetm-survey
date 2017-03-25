import { Component, ViewChild } from '@angular/core';
import { CenterService, HouseService, IKiosk } from '../../../service/';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'house-kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.css']
})
export class KioskComponent {

    constructor(
        private center: CenterService,
        private house: HouseService
    ) { }

    service = this.house.KioskService;
    kiosks = this.service.RxListView.map(values => values.filter(v => v.inheritable));
    services = this.center.ServiceService.RxListView;
    layouts = this.center.LayoutService.GetByType('kiosk');
    ticketlayouts = this.center.TicketLayoutService.GetAll();


    makeForm(b?: IKiosk) {
        b = b || <any>{};
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
            inheritable: [b.inheritable]
        });
    }
}

