// import { Component } from '@angular/core';
// import { MetaService, OrgService, IBranchConfig } from '../../../service/';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'admin-config',
//   templateUrl: 'branch_config.component.html'
// })
// export class BranchConfigComponent {
//   constructor(
//     private meta: MetaService,
//     private org: OrgService
//   ) { }

//   service = this.meta.BranchConfigService;

//   makeForm(u?: IBranchConfig) {
//     u = u || <any>{};
//     return (new FormBuilder).group({
//       id: [u.id],
//       branch_id: [u.branch_id, Validators.required],
//       feedback: [u.feedback || {}]
//     });
//   }

//   private branches = this.org.BranchService.RxListView;
// }

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

   service = this.meta.BranchConfigService;

  makeForm(u?: IBranchConfig) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      branch_id: [u.branch_id, Validators.required],
      feedback: [u.feedback || {}]
    });
  }

  protected NavigateTo(view = 'list') {
        console.log('navigate to', view);
        this.router.navigate(['../../', view], {
            queryParamsHandling: 'preserve',
            relativeTo: this.route
        });
    }

  private branches = this.org.BranchService.RxListView;
}

