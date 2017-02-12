import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService, Branch, Model, Org, AdminFilterService } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.css']
})
export class BranchComponent {
  constructor(
    private org: Org.OrgService,
    private authService: SharedService.Auth.AuthService,
    private filterService: AdminFilterService,
    private route: ActivatedRoute
  ) { }

  parents: Observable<Model.Org.IBranch[]>;
  private level: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = +params['level'] || 0;
      this.service.SetLevel(this.level);
      this.parents = this.service.GetListViewByLevel(this.level + 1);
      this.filterService.Refresh();
    });
  }

  makeForm(b?: Model.Org.IBranch) {
    b = b || <any>{ parent: '' };
    const maxLevel = Model.Org.CacheBranch.GetMaxLevel();
    if (this.level === maxLevel - 1) {
      b.parent = b.parent || `${maxLevel}`;
    }
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, Validators.required],
      code: [b.code, Validators.required],
      parent: [b.parent],
      level: [this.level || 0, Validators.required],
    });
  }

  service = this.org.BranchService;

}