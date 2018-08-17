import { Component, Input, ElementRef } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
    selector: 'timer',
    template: ``
})

export class TimerComopnent {

    constructor(private ref: ElementRef) {

    }

    @Input() timeWarning: number = 1500;
    @Input() start: number;
    @Input() refreshTime: number = 1000;
    private subscription: Subscription;
    private params: any;
    private native: HTMLElement = this.ref.nativeElement;

    ngAfterViewInit() {
        let refreshInterval = interval(this.refreshTime).pipe(startWith(0));
        let ctime = 0;
        if (this.start) {
            ctime = this.getCTime(this.start, this.timeWarning);
            this.subscription = refreshInterval.subscribe(_ => this.view(Date.now() / 1000 - ctime, this.timeWarning));
        } else if (this.params) {
            ctime = this.getCTime(this.params.data.mtime, this.params.timeWarning);
            this.subscription = refreshInterval.subscribe(_ => this.view(Date.now() / 1000 - ctime, this.params.timeWarning));
        }
    }

    agInit(params: any) {// get data from ag-grid
        this.params = params;
    }

    private getCTime(time: number, timeWarning: number) {
        let ctime = 0;
        if ((Date.now() / 1000 - time) < 0) {
            ctime = Date.now() / 1000;
            this.view(0, timeWarning);
        } else {
            ctime = time;
            this.view(0, timeWarning);
        }
        return ctime;
    }

    private TwoDigit(n: number): string {
        let v = Math.floor(n);
        return (v > 9 ? '' : '0') + v;
    }

    private view(duration: number, timeWarning: number) {
        let view = [duration / 3600, (duration % 3600) / 60, (duration % 60)].map(this.TwoDigit).join(":");
        this.native.innerHTML = view;
        if (((duration % 3600) - 1) / 60 > timeWarning || (duration / 3600) > 1) {
            this.native.style.backgroundColor = '#ff4d4d';
            this.native.style.color = '#ffffff';
            this.native.style.fontWeight = '600';
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

}