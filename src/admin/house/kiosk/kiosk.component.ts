import { Component, ViewChild } from '@angular/core';
import { Center, House, User } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';

import { FormBuilder, FormControl, Validators } from '@angular/forms';

function NewForm(b?: Model.House.IKiosk) {
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

type ServiceList = Model.Center.IService[];

@Component({
    selector: 'house-kiosk',
    templateUrl: 'kiosk.component.html',
    styleUrls: ['kiosk.component.css']
})
export class KioskComponent {

    service: Editor.IEditService<Model.House.IKiosk> = {
        api: House.Kiosk.Api,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = House.Kiosk.AutoRefresh();
    kiosks = this.data.map(values => values.filter(v => v.inheritable));
    services = Center.Service.GetAll();
    layouts = Center.Layout.GetByType('kiosk');

    fields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_NAME', name: 'name' }
    ]
}

