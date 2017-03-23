import { Component } from '@angular/core';
import { BranchConfigService, BranchService, IBranchConfig } from '../../../service/';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin-config',
  templateUrl: 'branch_config.component.html'
})
export class BranchConfigComponent {
  constructor(
    private branchService: BranchService,
    private service: BranchConfigService
  ) { }

  makeForm(u?: IBranchConfig) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      branch_id: [u.branch_id, Validators.required],
      feedback: [u.feedback || {}]
    });
  }

  private branches = this.branchService.RxListView;
}

