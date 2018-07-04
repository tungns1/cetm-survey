import { Component, Injector, OnInit } from '@angular/core';
import { MetaService, OrgService, IBranchConfig, HouseService, ICounter } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, RuntimeEnvironment, IStaffPosition, ICounterUserConfigs } from '../../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'admin-config',
    templateUrl: 'branch_config.component.html'
})
export class BranchConfigComponent extends BaseAdminComponent<IBranchConfig> {
    constructor(
        injector: Injector,
        private org: OrgService,
        private meta: MetaService,

    ) {
        super(injector, meta.BranchConfigService);
    }

    private branches = this.org.BranchService.RxListView;
    private staffPositionData$ = new BehaviorSubject<IStaffPosition>(null);
    private counters$ = new BehaviorSubject<any>(null);
    private curentBranch$ = new BehaviorSubject<string>('');
    private staffPositionConfig: ICounterUserConfigs[];
    private oldConfigs: ICounterUserConfigs[];

    ngOnInit() {
        this.formValue$.debounceTime(500).subscribe(value => {
            if (value.branch_id !== this.curentBranch$.value) {
                this.meta.GetStaffPos(value.branch_id).subscribe(d => {
                    this.staffPositionConfig = d.counter_user_configs;
                    this.oldConfigs = d.counter_user_configs;
                    // this.staffPositionConfig = [
                    //   {
                    //     branch_id: 'bra_FpzhkRiWytbUc3HGWhV7',
                    //     counter_id: 'cou_FKgioAetv9tu7Vxk406u',
                    //     user_id: 'usr_UtXXIjnssZ4mWWnv95L7'
                    //   }
                    //   , {
                    //     branch_id: 'bra_FpzhkRiWytbUc3HGWhV7',
                    //     counter_id: 'cou_4N7uYwxKYxWveEoHIOm6',
                    //     user_id: 'usr_Djfg8HIrJsAQjaqkYqZx'
                    //   }];
                    d.counter_user_configs = [];
                    this.staffPositionData$.next(d);
                });

                this.curentBranch$.next(value.branch_id);
            }
            if (value.counter.auto_login_counters === null) {
                this.counters$.next([])
            } else {
                this.counters$.next(value.counter.auto_login_counters)
            }
        });
    }

    makeForm(u?: IBranchConfig) {
        u = u || <any>{};
        return (new FormBuilder).group({
            id: [u.id],
            branch_id: [{ value: u.branch_id, disabled: !!u.id }, Validators.required],
            priority: [u.priority || {}],
            service: [u.service || {}],
            feedback: [u.feedback || {}],
            counter: [u.counter || {}],
            kiosk: [u.kiosk || {}]
        });
    }
    test() {
        console.log(this.staffPositionConfig);
        console.log(this.oldConfigs)
    }

    saveStaffPosition(ev: string) {
        console.log(ev)
        if (ev === 'add') {
            this.meta.SetStaffPos(this.staffPositionConfig).subscribe(res => {
                // console.log(res)
            });
        } else if (ev === 'edit') {
            this.staffPositionConfig.forEach(config => config.id = '')
            this.meta.UpdateStaffPos(this.staffPositionConfig, this.oldConfigs)
            // .subscribe(res => {
            //   console.log(res)
            // });
        }
    }

}

