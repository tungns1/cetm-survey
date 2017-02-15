import { Directive, Input } from '@angular/core';
import { Model } from '../../shared';


const VipColor = 'cyan';

@Directive({
    selector: '[ticket-highlight]',
    host: {
        '[style.background-color]': 'color'
    }
})
export class TicketHighlightDirective {
    @Input('ticket-highlight') set ticket(t: Model.House.ITicket) {
        if (t && t.vcode && t.vcode.length > 0) {
            this.color = VipColor;
        }
    }
    private color = '';
}