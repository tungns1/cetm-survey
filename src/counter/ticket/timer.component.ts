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
        let view = [from / 3600, (from % 3600) / 60, (from % 60)].map(TwoDigit).join(":");
        (this.ref.nativeElement).innerHTML = view;
    }

    @Input() set start(s: number) {
        this.clear();
        // let duration = Date.now() / 1000 - s;
        // const ctime = s + duration;
        this.view(0);
        this.subscription = oneSecond.subscribe(_ => this.view(Date.now() / 1000 - s));
    };

    ngOnDestroy() {
        this.clear();
    }
}