import { Component } from '@angular/core';
import { MetaService } from '../../service/';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch, Editor, Model } from '../shared/';

@Component({
  selector: 'admin-config',
  templateUrl: 'config.component.html'
})
export class ConfigComponent {
  constructor(
    private meta: MetaService,
  ) { }

  service = this.meta.ConfigService;

  makeForm(u?: Model.IConfig) {
    u = u || <any>{};
    return (new FormBuilder).group({
      id: [u.id],
      branch_id: [u.branch_id, Validators.required],
      feedback: [u.feedback || {}]
    });
  }

  private branches = Branch.LowestLayerBranch;
}

