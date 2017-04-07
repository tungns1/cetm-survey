// import { Component } from '@angular/core';
// import {
//     ISFlow, HouseService, CenterService
// } from '../../../service/';

// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//     selector: 'admin-sflow',
//     templateUrl: 'sflow.component.html'
// })
// export class SFlowComponent {

//     constructor(
//         private center: CenterService,
//         private house: HouseService,
//     ) { }

//     service = this.house.SFlowService;

//     services = this.center.ServiceService.RxListView;
//     tforms = this.center.TFormService.RxListView;
//     tformVips = this.tforms;

//     makeForm(b?: ISFlow) {
//         b = b || <any>{};
//         return (new FormBuilder).group({
//             id: [b.id],
//             branch_id: [b.branch_id, Validators.required],
//             service_id: [b.service_id, Validators.required],
//             tform_normal: [b.tform_normal, Validators.required],
//             tform_vip: [b.tform_vip]
//         });
//     }
// }


import { Component, Injector } from '@angular/core';
import { HouseService, ISFlow, CenterService } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

@Component({
    selector: 'admin-sflow',
    templateUrl: 'sflow.component.html'
})
export class SFlowComponent extends BaseAdminComponent<ISFlow> {
  constructor(
    injector: Injector,
    private house: HouseService,
    private org: CenterService
  ) { 
    super(injector, house.SFlowService);
  }

    service = this.house.SFlowService;

    services = this.org.ServiceService.RxListView;
    tforms = this.org.TFormService.RxListView;
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

