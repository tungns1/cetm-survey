import { Component, Injector } from '@angular/core';
import { MetaService, OrgService, IBranchConfig } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

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
}

