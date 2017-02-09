import { Component, ViewChild } from '@angular/core';
import { House, Center, User } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';

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

    constructor(
        private counterApi: House.Counter.CounterApi,
        private serviceApi: Center.Service.ServiceApi
    ) { }

    service: Editor.IEditService<Model.House.ICounter> = {
        api: this.counterApi,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = this.counterApi.AutoRefresh();
    services = this.serviceApi.GetAll();

    fields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_NAME', name: 'name' }
    ]
}

