import { Component, ViewChild, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { extend } from 'lodash';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router, ActivatedRoute } from '@angular/router';
import { CenterService, HouseService, IScreen } from '../../../service/';
import { BaseAdminComponent } from '../../shared';

@Component({
    selector: 'house-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.css']
})
export class ScreenComponent extends BaseAdminComponent<IScreen> {

    constructor(
        injector: Injector,
        private center: CenterService,
        private house: HouseService
    ) {
        super(injector, house.ScreenService);
        this.counters$.subscribe(console.log.bind(console));
    }

    screens = this.house.ScreenService.RxUpperList;
    layouts = this.center.LayoutService.GetByType('screen');

    counters$ = this.formValue$.map(form => form.branch_id)
        .distinctUntilChanged()
        .switchMap(branch_id => {
            return this.house.CounterService.GetByBranch([branch_id]);
        });

    makeForm(b?: IScreen) {
        b = b || <any>{};
        return this.center.LayoutService.GetByID(b.layout_id).map(layout => {
            b.layout_resources = extend({}, layout.ui.resources, layout.resources, b.layout_resources);
            return (new FormBuilder).group({
                id: [b.id],
                code: [b.code, Validators.required],
                name: [b.name, Validators.required],
                counters: [b.counters, Validators.required],
                branch_id: [b.branch_id, Validators.required],
                layout_id: [b.layout_id],
                parent_id: [b.parent_id],
                layout_resources: [b.layout_resources]
            });
        });
    }

}

