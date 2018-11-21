import { Component, ViewChild, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject ,  of } from 'rxjs';
import { extend } from 'lodash';
import { CenterService, HouseService, IScreen } from '../../../service/';
import { BaseAdminComponent, CommonValidator, USER_ROLES, RuntimeEnvironment } from '../../shared';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'house-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.scss']
})
export class ScreenComponent extends BaseAdminComponent<IScreen> {

    constructor(
        injector: Injector,
        private center: CenterService,
        private house: HouseService,
        private env: RuntimeEnvironment
    ) {
        super(injector, house.ScreenService);
        this.counters$.subscribe();
        this.layoutEditLink$.subscribe();
        this.voiceEditLink$.subscribe();
    }

    screens = this.house.ScreenService.RxUpperList;
    layouts = this.center.LayoutService.GetByType('screen');
    voice_lists$ = this.center.VoiceListService.GetAll();

    counters$ = this.formValue$.pipe(
        map(form => form.branch_id),
        distinctUntilChanged(),
        switchMap(branch_id => {
            return this.house.CounterService.GetByBranch([branch_id]);
        }));

    layoutEditLink$ = this.formValue$.pipe(map(s => {
        return `/admin/center/layout/${s.layout_id}`;
    }));

    parentEdit$ = this.formValue$.pipe(map(s => {
        return `/admin/house/screen/${s.parent_id}`;
    }));

    voiceEditLink$ = this.formValue$.pipe(map(s => {
        return `/admin/center/voice/${s.voice_list_id}`;
    }));

    isAdminStandard$ = this.env.Auth.User$.pipe(map(u =>
        u.role.indexOf(USER_ROLES.ADMIN_STANDARD) !== -1
    ));

    getLayout(layout_id?: string) {
        return layout_id ? this.center.LayoutService.GetByID(layout_id) : of(null);
    }

    makeForm(b?: IScreen) {
        b = b || <any>{};
        return this.getLayout(b.layout_id).pipe(map(layout => {
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
                counters: [b.counters],
                branch_id: [{ value: b.branch_id, disabled: !!b.id }, Validators.required],
                layout_id: [b.layout_id],
                parent_id: [b.parent_id],
                layout_resources: [b.layout_resources],
                voice_list_id: [b.voice_list_id]
            });
        }));
    }

}

