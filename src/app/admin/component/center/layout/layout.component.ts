
import { Component, Injector } from '@angular/core';
import { CenterService, ILayout, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'center-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent extends BaseAdminComponent<ILayout> {
  constructor(
    injector: Injector,
    private org: CenterService
  ) {
    super(injector, org.LayoutService);
  }

  private branches = this.org.LayoutService.RxListView;

  makeForm(b?: ILayout) {
    b = b || <any>{};
    b.ui = b.ui || <any>{};
    b.ui.resources = b.ui.resources || {};
    const resources = Object.assign(cloneDeep(b.ui.resources), b.resources);
    Object.keys(resources).forEach(name => {
      const show = !!resources[name];
      resources[name].show = show;
    });

    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, CommonValidator.Name],
      type: [b.type, Validators.required],
      ui: [b.ui || {}],
      style: [b.style],
      resources: [resources]
    });
  }
}


