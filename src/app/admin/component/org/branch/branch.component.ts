import { Component, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IBranch, CacheBranch, OrgService, AdminNavService } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { BaseAdminComponent, BranchFilterService, CommonValidator } from '../../shared';

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.scss']
})
export class BranchComponent extends BaseAdminComponent<IBranch> {
  constructor(
    injector: Injector,
    private org: OrgService,
    private branchFilter: BranchFilterService,
    private navService: AdminNavService
  ) {
    super(injector, org.BranchService);
    this.org.BranchService.RxListView.subscribe();
  }

  level$ = this.route.params.map(p => +p['level'] || 0);
  parentLevel$ = this.level$.map(l => l + 1);

  makeForm(b?: IBranch) {
    b = b || <any>{};
    const level = +this.route.snapshot.params['level'] || 0;
    b.level = b.level || level;
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, Validators.required],
      code: [b.code, CommonValidator.Code],
      parent: [b.parent],
      level: [b.level, Validators.required],
    });
  }

  parents$ = this.level$.switchMap(level => {
    const ids = this.branchFilter.getAllID();
    return CacheBranch.RxByLevel(level + 1).map(branches => {
      return branches.filter(b => ids.indexOf(b.id) !== -1);
    });
  });

  data$ = this.level$.switchMap(level => {
    return CacheBranch.RxByLevel(level).map(branches => {
      const parents = this.branchFilter.getByLevel(level + 1);
      branches.forEach(b => {
        b.parent_name = CacheBranch.GetNameForID(b.parent)
      });
      return branches.filter(b => parents.indexOf(b.parent) !== -1);
    });
  });

  private isAncestorOfMax(level: number) {
    return level < CacheBranch.GetMaxLevel();
  }
}