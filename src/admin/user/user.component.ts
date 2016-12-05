import { Component } from '@angular/core';
import { User } from '../backend/';
import { Branch, Editor, Model } from '../shared/';

@Component({
  selector: 'admin-user',
  templateUrl: 'user.component.html'
})
export class UserComponent {

  service: Editor.IEditService<Model.IUser> = {
    api: User.Api,
    form: User.NewForm,
    refresh: () => this.users.refresh()
  };

  users = User.AutoRefresh(Branch.SelectedBranchIDLevel0);
  private roles = Model.AllRoles;
  private branches = Branch.RxBranches;

  fields = [
    { title: 'Phòng giao dịch', name: 'branch' },
    { title: 'Họ và tên', name: 'fullname' }
  ]
}

