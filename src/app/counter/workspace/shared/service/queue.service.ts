import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import {
    ITicket, Ticket,
    TicketState, TicketStates, IMapTicket
} from '../shared';
import { WorkspaceService } from './workspace.service';

@Injectable()
export class QueueService {
    constructor(
        private workspaceService: WorkspaceService
    ) {
        
    }

    _waiting$ = this.workspaceService.Workspace$.map(w => w.Waiting)
    _serving$ = this.workspaceService.Workspace$.map(w => w.Serving);
    _missed$ = this.workspaceService.Workspace$.map(w => w.Missed);
    _cancel$ = this.workspaceService.Workspace$.map(w => w.Cancel);

    waiting$ = this._waiting$.map(q => q.ToArray());
    serving$ = this._serving$.map(q => q.ToArray());
    missed$ = this._missed$.map(q => q.ToArray());
    cancel$ = this._cancel$.map(q => q.ToArray());

    busy$ = this._serving$.map(q => q.size > 0);
    canNext$ = this._waiting$.map(q => q.size > 0)
        .combineLatest(this.busy$, (a, b) => a && !b);
}