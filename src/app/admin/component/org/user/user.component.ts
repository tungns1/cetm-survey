import { Component } from '@angular/core';
import { OrgService, IUser, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

@Component({
  selector: 'admin-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent extends BaseAdminComponent<IUser> {
  constructor(
    router: Router,
    route: ActivatedRoute,
    private org: OrgService
  ) { 
    super(router, route, org.UserService);
  }

  makeForm(u?: IUser) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      password: ['', u.id ? null : Validators.required], // do not require password on update
      username: [u.username, Validators.required],
      fullname: [u.fullname, Validators.required],
      email: [u.email],
      role: [u.role, Validators.required],
      branch_id: [u.branch_id, Validators.required],
    });
  }

  private roles = AllRoles;
  private branches = this.org.BranchService.RxListView;
}

