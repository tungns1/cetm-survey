import { Component, Injector } from '@angular/core';
import { OrgService, IUser, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';

@Component({
  selector: 'admin-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent extends BaseAdminComponent<IUser> {
  constructor(
    injector: Injector,
    private org: OrgService
  ) { 
    super(injector, org.UserService);
    // line below is remove admin standard to block bitel add new admin standard
    // this.roles.splice(this.roles.findIndex(r => r.name === 'ADMIN STANDARD'), 1);
  }

  pattern_pass: any ="^[a-zA-Z0-9_\?\!\@\#\$\*]{6,20}$";
  private roles = AllRoles;
  private branches = this.org.BranchService.RxListView;

  makeForm(u?: IUser) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      password: ['', u.id ? null : Validators.compose([ Validators.required, Validators.pattern(this.pattern_pass)])], // do not require password on update
      username: [ u.username, CommonValidator.Code],
      fullname: [u.fullname, Validators.required],
      email: [u.email],
      role: [u.role, Validators.required],
      branch_id: [u.branch_id, Validators.required],
    });
  }
}

