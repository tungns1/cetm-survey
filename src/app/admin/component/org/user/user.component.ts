import { Component, Injector, OnInit } from '@angular/core';
import { OrgService, IUser, AllRoles, RuntimeEnvironment, USER_ROLES } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';
import { combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'admin-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent extends BaseAdminComponent<IUser> {
  constructor(
    injector: Injector,
    private org: OrgService,
    private env: RuntimeEnvironment
  ) {
    super(injector, org.UserService);
    this.env.Auth.User$.pipe(first()).subscribe(u => {
      if (u.role === USER_ROLES.ADMIN_STANDARD)
        this.isAdminStandard = true;
    })
  }

  pattern_pass: any = "^[a-zA-Z0-9_\?\!\@\#\$\*]{6,20}$";
  private roles = AllRoles;
  private branches = this.org.BranchService.RxListView;
  private isAdminStandard: boolean = false;

  protected users$

  ngOnInit() {
    if (this.isAdminStandard) {
      this.roles.splice(this.roles.findIndex(r => r.code === USER_ROLES.ADMIN), 1);
      this.users$ = this.data$.pipe(map(users => users.filter(u => u.role !== USER_ROLES.ADMIN)))
    }
    else this.users$ = this.data$.pipe(map(users => users.filter(u => u.role !== 'admin_root')))
  }

  makeForm(u?: IUser) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      password: ['', u.id ? null : Validators.compose([Validators.required, Validators.pattern(this.pattern_pass)])], // do not require password on update
      username: [u.username, CommonValidator.Code],
      fullname: [u.fullname, Validators.required],
      email: [u.email],
      role: [u.role, Validators.required],
      branch_id: [u.branch_id, Validators.required],
      public_avatar: [u.public_avatar]
    });
  }

  onChange(){
    console.log(this.form.value)
  }
}

