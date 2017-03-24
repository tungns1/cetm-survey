import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBranch, CacheBranch, OrgService, AdminNavService, AuthService } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.css']
})
export class BranchComponent {
  constructor(
    private org: OrgService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private navService: AdminNavService
  ) { }

  parents: Observable<IBranch[]>;
  private level: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = +params['level'] || 0;
      this.service.SetLevel(this.level);
      this.parents = this.service.GetListViewByLevel(this.level + 1);
      this.navService.Refresh();
    });
  }

  makeForm(b?: IBranch) {
    b = b || <any>{ parent: '' };
    const maxLevel = CacheBranch.GetMaxLevel();
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