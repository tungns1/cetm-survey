import { Component } from '@angular/core';
import { CenterService, ITicketLayout } from '../../../service/';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'ticket-layout',
    templateUrl: 'ticket-layout.component.html'
})
export class TicketLayoutComponent {
    constructor(
        private center: CenterService
    ) { }
    tlayout = this.center.TicketLayoutService;

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

