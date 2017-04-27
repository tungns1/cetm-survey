
import { Component, Injector } from '@angular/core';
import { CenterService, ILayout, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'center-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css']
})
export class LayoutComponent extends BaseAdminComponent<ILayout> {
  constructor(
    injector: Injector,
    private org: CenterService
  ) {
    super(injector, org.LayoutService);
  }

  makeForm(b?: ILayout) {
    b = b || <any>{};
    b.ui = b.ui || <any>{};
    b.ui.resources = b.ui.resources || {};
    const resources = Object.assign(cloneDeep(b.ui.resources), b.resources);
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, Validators.required],
      type: [b.type, Validators.required],
      ui: [b.ui || {}],
      style: [b.style],
      resources: [resources]
    });
  }

  private branches = this.org.LayoutService.RxListView;
}


