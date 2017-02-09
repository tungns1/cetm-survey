import { Component } from '@angular/core';
import { Config } from '../../service/';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch, Editor, Model } from '../../shared/';

function NewForm(u?: Model.IConfig) {
  u = u || <any>{};
  return (new FormBuilder).group({
    id: [u.id],
    branch_id: [u.branch_id, Validators.required],
    feedback: [u.feedback || {}]
  });
}


@Component({
  selector: 'admin-config',
  templateUrl: 'config.component.html'
})
export class ConfigComponent {
  constructor(
    private configApi: Config.ConfigApi
  ) { }

  service: Editor.IEditService<Model.IConfig> = {
    api: this.configApi,
    form: NewForm,
    refresh: () => this.data.refresh()
  };

  data = this.configApi.AutoRefresh();
  private branches = Branch.LowestLayerBranch;

  fields = [
    { title: 'LABEL_SUB_BRANCH', name: 'branch' }
  ]
}

