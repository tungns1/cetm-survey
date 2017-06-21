import { Component, Injector } from '@angular/core';
import { CenterService, ITForm, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator, AppStorage } from '../../shared';

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
    if (AppStorage.Culture === 'vi')
      this.title = 'Định dạng số vé';
    else
      this.title = 'Ticket number format';
  }

  title: string = 'Ticket number format';
  pattern_format: any = "^[A-Z]?[%]0?([1-9])[d][A-Z]?$";

  makeForm(b?: ITForm) {
    b = b || <any>{};
    return (new FormBuilder).group({
      id: [b.id],
      code: [b.code, CommonValidator.Code],
      format: [b.format, Validators.compose([Validators.required, Validators.pattern(this.pattern_format)])],
      minnum: [b.minnum || 0, Validators.required],
      maxnum: [b.maxnum || 999, Validators.required],
      template: [b.template]
    });
  }

}



