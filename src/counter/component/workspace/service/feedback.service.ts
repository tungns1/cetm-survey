import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { ITicket } from '../../shared';
import { FeedbackDeviceAvailabel$ } from '../../../device';
import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { timer } from 'rxjs/observable/timer';

@Injectable()
export class FeedbackService {

    constructor(
        private workspaceService: WorkspaceService
    ) { }

    private socket = this.workspaceService.Socket;
    private feedbackDone$ = this.socket.RxEvent<ITicket>("/feedback_done");
    private skipFeedback$ = new ReplaySubject<string>(4, 1000);
    promptForSkip$ = new BehaviorSubject<ITicket>(null);

    SkipFeedback(t: ITicket) {
        this.promptForSkip$.next(null);
        this.skipFeedback$.next(t.id);
    }

    CheckFeedback(t: ITicket) {
        return FeedbackDeviceAvailabel$.switchMap(b => {
            if (b) {
                // check if done
                return this.feedbackDone$.filter(d => d.id === t.id)
                    .merge(timer(250).first().switchMap(_ => {
                        // ask to skip
                        this.promptForSkip$.next(t);
                        // skip feedback
                        return this.skipFeedback$.filter(id => id === t.id)
                    }))
                    .map(_ => t);
            }
            return of(t);
        }).first();
    }

}