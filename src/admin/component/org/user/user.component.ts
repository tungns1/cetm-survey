import { Component } from '@angular/core';
import { AdminFilterService, Org } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch, Editor, Model } from '../../../shared/';

function NewForm(u?: Model.Org.IUser) {
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


@Component({
  selector: 'admin-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent {
  constructor(
    private filterService: AdminFilterService,
    private userApi: Org.UserApi
  ) { }

  service: Editor.IEditService<Model.Org.IUser> = {
    api: this.userApi,
    form: NewForm,
    refresh: () => { }
  };

  users = this.filterService.ValueChanges.switchMap(v => {
    return this.userApi.GetByBranch(v.GetBranchIDAtLowestLevel())
      .do(data => Model.Org.CacheBranch.Join(data))
  });

  private roles = Model.Org.AllRoles;
  private branches = Branch.LowestLayerBranch;

  fields = [
    { title: 'LABEL_BRANCH', name: 'branch' },
    { title: 'LABEL_FULLNAME', name: 'fullname' }
  ]
}

