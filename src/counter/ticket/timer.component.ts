import { Component, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/share';

function TwoDigit(n: number): string {
    let v = Math.floor(n);
    return (v > 9 ? '' : '0') + v;
}

const oneSecond = interval(1000).share();

@Component({
    selector: 'ticket-timer',
    template: ``
})
export class TicketTimerComopnent {
    constructor(private ref: ElementRef) {

    }

    private subscription: Subscription;

    private clear() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    private view(from: number) {
        const duration = Date.now() / 1000 - from;
        let view = [duration / 3600, (duration % 3600) / 60, (duration % 60)].map(TwoDigit).join(":");
        (this.ref.nativeElement).innerHTML = view;
    }

    @Input() set start(s: number) {
        this.clear();
        let duration = Date.now() / 1000 - s;
        let ctime = 0;
        if (duration > 0) {
            ctime = s + duration;
            this.view(s + duration);
        } else if (duration < 0) {
            ctime = s - duration;
            this.view(s - duration);
        } else {
            ctime = s;
            this.view(s);
        }

        this.subscription = oneSecond.subscribe(_ => this.view(ctime));
    };

    ngOnDestroy() {
        this.clear();
    }
}