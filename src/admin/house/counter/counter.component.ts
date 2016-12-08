import { Component, ViewChild } from '@angular/core';
import { House, Service, User } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';

import { FormBuilder, FormControl, Validators } from '@angular/forms';

function NewForm(b?: Model.House.ICounter) {
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

@Component({
    selector: 'house-counter',
    templateUrl: 'counter.component.html',
      styleUrls: ['counter.component.css']
})
export class CounterComponent {

    service: Editor.IEditService<Model.House.ICounter> = {
        api: House.Counter.Api,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = House.Counter.AutoRefresh();
    services = Service.GetAll();

    fields = [
        { title: 'Phòng giao dịch', name: 'branch' },
        { title: 'Tên', name: 'name' }
    ]
}

