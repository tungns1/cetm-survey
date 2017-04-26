import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IStat, IValues } from '../shared';
import { WorkspaceService } from '../shared';
import { combineLatest } from 'rxjs/observable/combineLatest';


const TABS = {
    FINISHED: 'FINISHED',
    CANCELLED: 'CANCELLED'
}

@Component({
    selector: 'sta',
    templateUrl: 'sta.component.html',
    styleUrls: ['sta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaComponent {
    constructor(
        private workspaceService: WorkspaceService
    ) { }

    ngOnInit() {
        this.showFinished();
        this.workspaceService.stat$.map(s => this.toArray(s.finished)).subscribe(this.finished$);
        this.workspaceService.stat$.map(s => this.toArray(s.cancelled)).subscribe(this.cancelled$);
    }

    finished$ = new ReplaySubject<IStat[]>(1);
    cancelled$ = new ReplaySubject<IStat[]>(1);
    fcount$ = this.finished$.map(SumStat);
    ccount$ = this.cancelled$.map(SumStat);
    stime$ = combineLatest<IStat[], IStat[]>(this.finished$, this.cancelled$).map(([finish, cancel]) => {
        return AverageTime(finish, cancel);
    });

    tab$ = new ReplaySubject<string>(1);
    data$ = this.tab$.switchMap(tab => {
        return tab === TABS.FINISHED ? this.finished$ : this.cancelled$;
    })

    showFinished$ = this.tab$.map(tab => tab === TABS.FINISHED);
    showCancelled$ = this.tab$.map(tab => tab === TABS.CANCELLED);

    showFinished() {
        this.tab$.next(TABS.FINISHED);
    }

    showCancelled() {
        this.tab$.next(TABS.CANCELLED);
    }

    toArray(o: { [index: string]: IValues }) {
        return Object.keys(o).map(id => <IStat>{
            service_id: id,
            value: o[id]
        });
    }

}

export function SumStat(stats: IStat[]) {
    let s = 0;
    stats.forEach(a => s += a.value.count);
    return s;
}

export function AverageTime(finish: IStat[], cancel: IStat[]) {
    let s = 0;
    let t = 0;
    finish.forEach(a => {
        s += a.value.count;
        t += a.value.stime;
    });
    cancel.forEach(a => {
        s += a.value.count;
        t += a.value.stime;
    });
    return t/s;
}
