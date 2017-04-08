import { Component, Injector } from '@angular/core';
import { CenterService, ITForm, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

@Component({
  selector: 'center-tform',
  templateUrl: 'tform.component.html',
  styleUrls: ['tform.component.css']
})
export class TFormComponent extends BaseAdminComponent<ITForm> {
  constructor(
    injector: Injector,
    private org: CenterService
  ) {
    super(injector, org.TFormService);
  }

  makeForm(b?: ITForm) {
    b = b || <any>{};
    return (new FormBuilder).group({
      id: [b.id],
      code: [b.code, Validators.required],
      format: [b.format, Validators.required],
      minnum: [b.minnum || 0, Validators.required],
      maxnum: [b.maxnum || 999, Validators.required],
      template: [b.template]
    });
  }
}



