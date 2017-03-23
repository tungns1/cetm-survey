import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBranch, CacheBranch, BranchService, AuthService } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.css']
})
export class BranchComponent {
  constructor(
    private branchService: BranchService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  parents: Observable<IBranch[]>;
  private level: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = +params['level'] || 0;
      this.branchService.SetLevel(this.level);
      this.parents = this.branchService.GetListViewByLevel(this.level + 1);
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

}