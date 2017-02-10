import { Component } from '@angular/core';
import { User } from '../../../service/';
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
    private userApi: User.UserApi
  ) { }

  service: Editor.IEditService<Model.Org.IUser> = {
    api: this.userApi,
    form: NewForm,
    refresh: () => this.users.refresh()
  };

  users = this.userApi.AutoRefresh();
  private roles = Model.AllRoles;
  private branches = Branch.LowestLayerBranch;

  fields = [
    { title: 'LABEL_BRANCH', name: 'branch' },
    { title: 'LABEL_FULLNAME', name: 'fullname' }
  ]
}

