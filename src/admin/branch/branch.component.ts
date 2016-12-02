import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../backend/';
import { Auth, Backend, Branch, Editor, Model } from '../shared/';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

export function NewForm(b?: Model.IBranch) {
    b = b || <any>{};
    return (new FormBuilder).group({
        id: [b.id],
        name: [b.name, Validators.required],
        code: [b.code, Validators.required],
        parent: [b.parent],
        level: [b.level || 0, Validators.required],
    });
}


export const Api = new Backend.HttpApi<Model.IUser>("/api/admin/user");

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html'
})
export class BranchComponent {
  constructor(route: ActivatedRoute) {
    route.params.forEach(params => {
      this.level = +params['level'];
      if (isNaN(this.level)) {
        this.level = 2;
      }
      this.branches = Branch.AllLevels[this.level].shown;
      let level = Branch.BranchLevels.filter(v => v.value === this.level)[0];
      this.fields[0].title = level.name;
    });
  }
  
  branches: Observable<Model.IBranch[]>;
  private level: number;

  Refresh() {
    Auth.RefreshMySettings().subscribe(console.log);
  }

  service: Editor.IEditService<Model.IUser> = {
    api: Api,
    form: NewForm,
    refresh: () => this.Refresh()
  };

  fields: Editor.IField[] = [
    {title: "Chi nhánh cha", name: "parent_name"},
    {title: "Tên chi nhánh", name: "name"},
    {title: "Mã", name: "code"}
  ]

}