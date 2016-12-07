import { Component, Input, ElementRef } from '@angular/core';
import { interval } from 'rxjs/observable/interval';


function TwoDigit(n: number): string {
    return (n > 9 ? '' : '0') + Math.round(n);
}

@Component({
    selector: 'ticket-timer',
    template: ``
})
export class TicketTimerComopnent {
    constructor(private ref: ElementRef) {

    }

    timer: NodeJS.Timer;

    private clear() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    private view(from: number) {
        const duration = Date.now() / 1000 - from;
        let view = [duration / 3600, (duration % 3600) / 60, (duration % 60)].map(TwoDigit).join(":");
        (this.ref.nativeElement).innerHTML = view;
    }

    @Input() set start(s: number) {
        this.clear();
        this.view(s);
        this.timer = setInterval(_ => this.view(s), 1000);
    };

    ngOnDestroy() {
        this.clear();
    }
}