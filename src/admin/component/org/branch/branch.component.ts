import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService, Branch, Editor, Model } from '../../../shared/';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

export const Api = new SharedService.Backend.HttpApi<Model.Org.IBranch>("/api/admin/org/branch");

@Component({
  selector: 'admin-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.css']
})
export class BranchComponent {
  constructor(
    private authService: SharedService.Auth.AuthService,
    private route: ActivatedRoute
  ) {
    route.params.forEach(params => {
      this.level = +params['level'];
      if (isNaN(this.level)) {
        this.level = 2;
      }
      this.branches = Branch.GetLayer(this.level).shown;
      let level = Model.Org.BranchLevels.filter(v => v.value === this.level)[0];
      this.fields[0].title = level.name;
      let up = Branch.GetLayer(this.level + 1);
      if (up) {
        this.upperLayers = up.shown;
      } else {
        this.upperLayers = null;
      }
    });
  }

  branches: Observable<Model.Org.IBranch[]>;
  upperLayers: Observable<Model.Org.IBranch[]>;
  private level: number;

  Refresh() {
    this.authService.RefreshMySettings().subscribe(console.log);
  }


  NewForm(b?: Model.Org.IBranch) {
    b = b || <any>{};
    const maxLevel = Model.Org.CacheBranch.GetMaxLevel();
    if (this.level === maxLevel - 1) {
      b.parent = b.parent || maxLevel;
    }
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, Validators.required],
      code: [b.code, Validators.required],
      parent: [b.parent],
      level: [this.level || 0, Validators.required],
    });
  }

  service: Editor.IEditService<Model.Org.IBranch> = {
    api: Api,
    form: u => this.NewForm(u),
    refresh: () => this.Refresh()
  };

  fields: Editor.IField[] = [
    { title: "LABEL_NAME_ADDRESS_FATHER", name: "parent_name" },
    { title: "LABEL_NAME_ADDRESS", name: "name" },
    { title: "LABEL_CODE", name: "code" }
  ]

}