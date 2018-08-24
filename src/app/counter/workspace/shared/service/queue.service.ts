import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { map, combineLatest } from 'rxjs/operators';

@Injectable()
export class QueueService {
    constructor(
        private workspaceService: WorkspaceService
    ) { }

    _waiting$ = this.workspaceService.Workspace$.pipe(map(w => w.Waiting));
    _serving$ = this.workspaceService.Workspace$.pipe(map(w => w.Serving));
    _missed$ = this.workspaceService.Workspace$.pipe(map(w => w.Missed));
    _cancel$ = this.workspaceService.Workspace$.pipe(map(w => w.Cancel));

    waiting$ = this._waiting$.pipe(map(q => q.ToArray()));
    serving$ = this._serving$.pipe(map(q => q.ToArray()));
    missed$ = this._missed$.pipe(map(q => q.ToArray()));
    cancel$ = this._cancel$.pipe(map(q => q.ToArray()));

    busy$ = this._serving$.pipe(map(q => q.size > 0));
    canNext$ = this._waiting$.pipe(map(q => q.size > 0),combineLatest(this.busy$, (a, b) => a && !b));
}