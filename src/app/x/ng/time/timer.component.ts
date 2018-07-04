import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/share';
@Component({
    selector: 'timer',
    template: ``
})


export class TimerComopnent {

    constructor(private ref: ElementRef) {

    }

    private subscription: Subscription;
    private params: any;
    private oneSecond = interval(1000).share();
    private native: HTMLElement = this.ref.nativeElement;

    @Input() timeWarning: number = 1500;
    @Input() set start(t: number) {
        this._start = t;
        this.ngAfterViewInit();
    }

    _start: number;

    ngAfterViewInit() {
        this.clear();
        let ctime = 0;
        if (this._start) {
            ctime = this.getCTime(this._start, this.timeWarning);
            this.subscription = this.oneSecond.subscribe(_ => this.view(Date.now() / 1000 - ctime, this.timeWarning));
        } else if (this.params) {
            ctime = this.getCTime(this.params.data.mtime, this.params.timeWarning);
            this.subscription = this.oneSecond.subscribe(_ => this.view(Date.now() / 1000 - ctime, this.params.timeWarning));
        }
    }

    agInit(params: any): void {// get data from ag-grid
        this.params = params;
    }

    getCTime(time: number, timeWarning: number) {
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

    TwoDigit(n: number): string {
        let v = Math.floor(n);
        return (v > 9 ? '' : '0') + v;
    }

    private clear() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
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
        this.clear();
    }

}