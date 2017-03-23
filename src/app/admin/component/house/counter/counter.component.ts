import { Component, ViewChild } from '@angular/core';
import { CounterService, ServiceService, ICounter } from '../../../service/';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'house-counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.css']
})
export class CounterComponent {

    constructor(
        private serviceService: ServiceService,
        private service: CounterService
    ) { }

    services = this.serviceService.RxListView;
    makeForm(b?: ICounter) {
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
}

