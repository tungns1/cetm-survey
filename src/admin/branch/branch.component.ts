import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../backend/';
import { Auth, Backend, Branch, Editor, Model } from '../shared/';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';



export const Api = new Backend.HttpApi<Model.IBranch>("/api/admin/branch");

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.css']
})
export class BranchComponent {
  constructor(route: ActivatedRoute) {
    route.params.forEach(params => {
      this.level = +params['level'];
      if (isNaN(this.level)) {
        this.level = 2;
      }
      this.branches = Branch.GetLayer(this.level).shown;
      let level = Branch.BranchLevels.filter(v => v.value === this.level)[0];
      this.fields[0].title = level.name;
      let up = Branch.GetLayer(this.level + 1);
      if (up) {
        this.upperLayers = up.shown;
      } else {
        this.upperLayers = null;
      }
    });
  }

  branches: Observable<Model.IBranch[]>;
  upperLayers: Observable<Model.IBranch[]>;
  private level: number;

  Refresh() {
    Auth.RefreshMySettings().subscribe(console.log);
  }


  NewForm(b?: Model.IBranch) {
    b = b || <any>{};
    if (this.level === Branch.RxMax.value.level - 1) {
      b.parent = b.parent || Branch.RxMax.value.id;
    } 
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, Validators.required],
      code: [b.code, Validators.required],
      parent: [b.parent],
      level: [this.level || 0, Validators.required],
    });
  }

  service: Editor.IEditService<Model.IBranch> = {
    api: Api,
    form: u => this.NewForm(u),
    refresh: () => this.Refresh()
  };

  fields: Editor.IField[] = [
    { title: "Địa điểm cha", name: "parent_name" },
    { title: "Tên địa điểm", name: "name" },
    { title: "Mã", name: "code" }
  ]

}