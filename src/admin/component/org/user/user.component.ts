import { Component } from '@angular/core';
import { FilterService, Org } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch, Editor, Model } from '../../shared/';

@Component({
  selector: 'admin-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent {
  constructor(
    private org: Org.OrgService
  ) { }

  makeForm(u?: Model.Org.IUser) {
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

  service = this.org.UserService;
  private roles = Model.Org.AllRoles;
  private branches = Branch.LowestLayerBranch;
}

