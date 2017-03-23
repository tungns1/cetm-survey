import { Component } from '@angular/core';
import {
    ISFlow, ServiceService, TFormService, SFlowService
} from '../../../service/';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'admin-sflow',
    templateUrl: 'sflow.component.html'
})
export class SFlowComponent {

    constructor(
        private serviceService: ServiceService,
        private tformService: TFormService,
        private sflowService: SFlowService,
    ) { }

    service = this.sflowService;

    services = this.serviceService.RxListView;
    tforms = this.tformService.RxListView;
    tformVips = this.tforms;

    makeForm(b?: ISFlow) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            branch_id: [b.branch_id, Validators.required],
            service_id: [b.service_id, Validators.required],
            tform_normal: [b.tform_normal, Validators.required],
            tform_vip: [b.tform_vip]
        });
    }
}

