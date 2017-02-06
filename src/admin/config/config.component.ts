import { Component } from '@angular/core';
import { Config } from '../backend/';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch, Editor, Model } from '../shared/';

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

  service: Editor.IEditService<Model.IConfig> = {
    api: Config.Api,
    form: NewForm,
    refresh: () => this.data.refresh()
  };

  data = Config.AutoRefresh();
  private branches = Branch.LowestLayerBranch;

  fields = [
    { title: 'LABEL_SUB_BRANCH', name: 'branch' }
  ]
}

