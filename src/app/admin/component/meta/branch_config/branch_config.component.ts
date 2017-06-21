import { Component, Injector } from '@angular/core';
import { MetaService, OrgService, IBranchConfig } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, AppStorage } from '../../shared';

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
    if (AppStorage.Culture === 'vi')
      this.title = 'Cấu hình chi nhánh';
    else
      this.title = 'Branch config';
  }

  title = 'branch config';
  private branches = this.org.BranchService.RxListView;

  makeForm(u?: IBranchConfig) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      branch_id: [u.branch_id, Validators.required],
      service: [u.service || {}],
      feedback: [u.feedback || {}]
    });
  }

  protected NavigateTo(view = 'list') {
    console.log('navigate to', view);
    this.router.navigate(['../', view], {
      queryParamsHandling: 'preserve',
      relativeTo: this.route
    });
  }

}

