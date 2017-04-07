// import { Component } from '@angular/core';
// import { CenterService, ITicketLayout } from '../../../service/';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//     selector: 'ticket-layout',
//     templateUrl: 'ticket-layout.component.html'
// })
// export class TicketLayoutComponent {
//     constructor(
//         private center: CenterService
//     ) { }
//     tlayout = this.center.TicketLayoutService;

//     makeForm(b?: ITicketLayout) {
//         b = b || <any>{};
//         return (new FormBuilder).group({
//             id: [b.id],
//             name: [b.name],
//             l10n: [b.l10n],
//             url_logo: [b.url_logo]
//         });
//     }
// }

import { Component, Injector } from '@angular/core';
import { CenterService, ITicketLayout, AllRoles} from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent } from '../../shared';

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
  }
 tlayout = this.org.TicketLayoutService;

    makeForm(b?: ITicketLayout) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            name: [b.name],
            l10n: [b.l10n],
            url_logo: [b.url_logo]
        });
    }
}

