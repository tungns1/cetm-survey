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
    selector: 'timer',
    template: ``
})
export class TimerComopnent {
    constructor(private ref: ElementRef) {

    }

    private subscription: Subscription;

    private clear() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    private view(duration: number) {
        let view = [duration / 3600, (duration % 3600) / 60, (duration % 60)].map(TwoDigit).join(":");
        (this.ref.nativeElement).innerHTML = view;
    }

    @Input() set start(s: number) {
        this.clear();
        let ctime=0;
        if((Date.now() / 1000-s)<0){
            this.view(0);
            ctime=Date.now() / 1000;
        }else{
            this.view(0);
            ctime=s;
        }
        this.subscription = oneSecond.subscribe(_ => this.view(Date.now() / 1000 - ctime));
    };

    ngOnDestroy() {
        this.clear();
    }
}