
import { Component, Injector } from '@angular/core';
import { CenterService, ITicketLayout, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator, AppStorage } from '../../shared';

@Component({
  selector: 'ticket-layout',
  templateUrl: 'ticket-layout.component.html'
})
export class TicketLayoutComponent extends BaseAdminComponent<ITicketLayout> {
  constructor(
    injector: Injector,
    private org: CenterService
  ) {
    super(injector, org.TicketLayoutService);
    if (AppStorage.Culture === 'vi')
      this.title = 'Cấu hình vé';
    if (AppStorage.Culture === 'sp')
      this.title = 'DISEÑO DE TICKET';
    else
      this.title = 'Ticket Layout';
  }
  
  title = 'Ticket Layout';

  makeForm(b?: ITicketLayout) {
    b = b || <any>{};
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, CommonValidator.Name],
      l10n: [b.l10n],
      url_logo: [b.url_logo]
    });
  }
}

