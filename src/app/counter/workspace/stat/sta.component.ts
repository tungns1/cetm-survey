import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceService } from '../shared';
import { switchMap, map } from 'rxjs/operators';

class TabGroup extends BehaviorSubject<string> {
    constructor(
        private tabs: string[] = []
    ) {
        super(tabs[0]);
    }

    SetActive(tab: string) {
        this.next(tab);
    }

    IsActive(tab: string) {
        return this.value == tab;
    }
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
        this.tab$.SetActive("finished");
    }

    stat$ = this.workspaceService.stat$;
    average_stime$ = this.stat$.pipe(map(s => s.average_stime));
    fcount$ = this.stat$.pipe(map(s => s.finished.total_count));
    ccount$ = this.stat$.pipe(map(s => s.cancelled.total_count));

    tab$ = new TabGroup(["finished", "cancelled"]);

    data$ = this.tab$.pipe(switchMap(tab => {
        return tab === 'finished' ? this.stat$.pipe(map(s => s.finished)) : this.stat$.pipe(map(s => s.cancelled));
    }))
}
