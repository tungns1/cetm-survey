import { Component } from '@angular/core';
import { Meta, Org } from '../../../service/';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch, Editor, Model } from '../../shared/';

@Component({
  selector: 'admin-config',
  templateUrl: 'branch_config.component.html'
})
export class BranchConfigComponent {
  constructor(
    private meta: Meta.MetaService,
    private org: Org.OrgService
  ) { }

  service = this.meta.BranchConfigService;

  makeForm(u?: Model.Meta.IBranchConfig) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      branch_id: [u.branch_id, Validators.required],
      feedback: [u.feedback || {}]
    });
  }

  private branches = this.org.BranchService.RxListView;
}

