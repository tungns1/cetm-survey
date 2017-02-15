import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WorkspaceService, IStat } from '../shared';

@Component({
    selector: 'sta',
    templateUrl: 'sta.component.html',
    styleUrls: ['sta.component.css']
})
export class StaComponent {
    constructor(
        private workspaceService: WorkspaceService
    ) { }

    finished$ = this.workspaceService.stat$.map(s => this.toArray(s.finished));
    fc = this.finished$.map(SumStat);
    cancelled = this.workspaceService.stat$.map(s => this.toArray(s.cancelled));
    cc = this.cancelled.map(SumStat);

    tab = 'finished';

    toArray(o: {[index: string]: number}) {
        return Object.keys(o).map(id => <IStat>{
            service_id: id,
            count: o[id]
        });
    }

}

export function SumStat(stats: IStat[]) {
    let s = 0;
    stats.forEach(a => s += a.count);
    return s;
}
