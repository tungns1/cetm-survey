import { Component, Injector, OnInit } from '@angular/core';
import { MetaService, OrgService, IBranchConfig } from '../../shared/';
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
    private meta: MetaService
  ) {
    super(injector, meta.BranchConfigService);
  }

  private branches = this.org.BranchService.RxListView;
  private staffPositionData$ = new BehaviorSubject<IStaffPosition>(null);
  private curentBranch$ = new BehaviorSubject<string>('');
  private staffPositionConfig: ICounterUserConfigs[];

  ngOnInit() {
    this.formValue$.debounceTime(500).subscribe(value => {
      if (value.branch_id !== this.curentBranch$.value) {
        this.meta.GetStaffPos(value.branch_id).subscribe(d => {
          this.staffPositionConfig = d.counter_user_configs;
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

  saveStaffPosition(ev, value) {
    // console.log(ev)
    // console.log(value)
    // console.log(this.staffPositionConfig)
    this.meta.SetStaffPos(this.staffPositionConfig).subscribe(res => console.log(res))
  }

}

