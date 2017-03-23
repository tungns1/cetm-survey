import { Component } from '@angular/core';
import { MetaService, OrgService, IBranchConfig } from '../../../service/';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin-config',
  templateUrl: 'branch_config.component.html'
})
export class BranchConfigComponent {
  constructor(
    private meta: MetaService,
    private org: OrgService
  ) { }

  service = this.meta.BranchConfigService;

  makeForm(u?: IBranchConfig) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      branch_id: [u.branch_id, Validators.required],
      feedback: [u.feedback || {}]
    });
  }

  private branches = this.org.BranchService.RxListView;
}

