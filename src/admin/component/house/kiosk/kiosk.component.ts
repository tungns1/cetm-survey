import { Component, ViewChild } from '@angular/core';
import { Center, House, Org } from '../../../service/';
import { Branch, Model } from '../../../shared/';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'house-kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.css']
})
export class KioskComponent {

    constructor(
        private center: Center.CenterService,
        private house: House.HouseService
    ) { }

    service = this.house.KioskService;
    kiosks = this.service.RxListView.map(values => values.filter(v => v.inheritable));
    services = this.center.ServiceService.RxListView;
    layouts = this.center.LayoutService.GetByType('kiosk');

    makeForm(b?: Model.House.IKiosk) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, Validators.required],
            name: [b.name, Validators.required],
            services: [b.services],
            branch_id: [b.branch_id, Validators.required],
            vcodes: [b.vcodes],
            layout_id: [b.layout_id],
            parent_id: [b.parent_id],
            inheritable: [b.inheritable]
        });
    }
}

