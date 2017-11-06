import { Component, ViewChild, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { extend } from 'lodash';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router, ActivatedRoute } from '@angular/router';
import { CenterService, HouseService, IFeedback } from '../../../service/';
import { BaseAdminComponent, CommonValidator, USER_ROLES, RuntimeEnvironment } from '../../shared';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends BaseAdminComponent<IFeedback> {

    constructor(
        injector: Injector,
        private center: CenterService,
        private house: HouseService,
        private env: RuntimeEnvironment
    ) {
        super(injector, house.FeedbackService);
        this.counters$.subscribe();
        this.layoutEditLink$.subscribe();
        // this.voiceEditLink$.subscribe();
    }

    feedbacks = this.house.FeedbackService.RxUpperList;
    layouts = this.center.LayoutService.GetByType('feedback');

    counters$ = this.formValue$.map(form => form.branch_id)
        .distinctUntilChanged()
        .switchMap(branch_id => {
            return this.house.CounterService.GetByBranch([branch_id]);
        });

    layoutEditLink$ = this.formValue$.map(s => {
        return `/admin/center/layout/${s.layout_id}`;
    });

    parentEdit$ = this.formValue$.map(s => {
        return `/admin/house/feedback/${s.parent_id}`;
    });

    // voiceEditLink$ = this.formValue$.map(s => {
    //     return `/admin/center/voice/${s.voice_list_id}`;
    // });

    isAdminStandard$ = this.env.Auth.User$.map(u =>
        u.role.indexOf(USER_ROLES.ADMIN_STANDARD) !== -1
    );

    getLayout(layout_id?: string) {
        return layout_id ? this.center.LayoutService.GetByID(layout_id) : of(null);
    }

    makeForm(b?: IFeedback) {
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
                code: [b.code, CommonValidator.Code],
                name: [b.name, CommonValidator.Name],
                counter_id: b.counter_id,
                branch_id: [{ value: b.branch_id, disabled: !!b.id }, Validators.required],
                layout_id: [b.layout_id],
                parent_id: [b.parent_id],
                layout_resources: [b.layout_resources]
            });
        });
    }

}