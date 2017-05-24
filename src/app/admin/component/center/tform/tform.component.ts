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

  title = 'Ticket Number Format'

  pattern_format: any ="^[%]0?([1-9])[d][A-Z]$";
  pattern_code: any ="^[a-zA-Z0-9-_]{4,19}$";
  makeForm(b?: ITForm) {
    b = b || <any>{};
    return (new FormBuilder).group({
      id: [b.id],
      code: [b.code, Validators.compose([Validators.required, Validators.pattern(this.pattern_code)])],
      format: [b.format, Validators.compose([Validators.required, Validators.pattern(this.pattern_format)])],
      minnum: [b.minnum || 0, Validators.required],
      maxnum: [b.maxnum || 999, Validators.required],
      template: [b.template]
    });
  }

}



