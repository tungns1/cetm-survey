import { Component, ViewChild, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { extend } from 'lodash';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router, ActivatedRoute } from '@angular/router';
import { CenterService, HouseService, IScreen } from '../../../service/';
import { BaseAdminComponent } from '../../shared';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'house-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.scss']
})
export class ScreenComponent extends BaseAdminComponent<IScreen> {

    constructor(
        injector: Injector,
        private center: CenterService,
        private house: HouseService
    ) {
        super(injector, house.ScreenService);
        this.counters$.subscribe();
        this.layoutEditLink$.subscribe(c => console.log(c));
    }

    title = 'screen';

    screens = this.house.ScreenService.RxUpperList;
    layouts = this.center.LayoutService.GetByType('screen');

    counters$ = this.formValue$.map(form => form.branch_id)
        .distinctUntilChanged()
        .switchMap(branch_id => {
            return this.house.CounterService.GetByBranch([branch_id]);
        });

    layoutEditLink$ = this.formValue$.map(s => {
        return `/admin/center/layout/${s.layout_id}`;
    });
    
    parentEdit$ = this.formValue$.map(s => {
        return `/admin/house/screen/${s.parent_id}`;
    })

    getLayout(layout_id?: string) {
        return layout_id ? this.center.LayoutService.GetByID(layout_id) : of(null);
    }

    pattern_code: any ="^[a-zA-Z][a-zA-Z0-9-_]{5,19}$";
    makeForm(b?: IScreen) {
        b = b || <any>{};
        return this.getLayout(b.layout_id).map(layout => {
            if (layout) {
                b.layout_resources = extend({}, layout.ui.resources, layout.resources, b.layout_resources);
                Object.keys(b.layout_resources).forEach(name => {
                    const show = !!layout.ui.resources[name];
                    b.layout_resources[name].show = show;
                });
            }
            return (new FormBuilder).group({
                id: [b.id],
                code: [b.code, Validators.compose([Validators.required, Validators.pattern(this.pattern_code)])],
                name: [b.name, Validators.required],
                counters: [b.counters],
                branch_id: [b.branch_id, Validators.required],
                layout_id: [b.layout_id],
                parent_id: [b.parent_id],
                layout_resources: [b.layout_resources]
            });
        });
    }

}

