import { Component, Injector } from '@angular/core';
import { CenterService, ITForm, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';

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

  ticket_format_pattern = "^[A-Z0-9]*?[%]0?([1-9])[d][A-Z]?$";

  makeForm(b?: ITForm) {
    b = b || <any>{};
    return (new FormBuilder).group({
      id: [b.id],
      code: [b.code, CommonValidator.Code],
      format: [b.format, Validators.compose([Validators.required, Validators.pattern(this.ticket_format_pattern)])],
      minnum: [b.minnum || 0, Validators.required],
      maxnum: [b.maxnum || 999, Validators.required],
      template: [b.template]
    });
  }

}



