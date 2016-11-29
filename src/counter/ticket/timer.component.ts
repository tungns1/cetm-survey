import { Component, Input } from '@angular/core';
import { interval } from 'rxjs/observable/interval';


function TwoDigit(n: number): string {
    return (n > 9 ? '' : '0') + Math.round(n);
}

@Component({

    selector: 'ticket-timer',
    template: `{{i | async}}`
})
export class TicketTimerComopnent {
    @Input() start = Date.now() / 1000;
    convert() {
        const duration = Date.now() / 1000 - this.start;
        return [duration / 3600, (duration % 3600) / 60, (duration % 60)].map(TwoDigit).join(":");
    }
    
    i = interval(1000).map(_ => {
        return this.convert();
    });
}