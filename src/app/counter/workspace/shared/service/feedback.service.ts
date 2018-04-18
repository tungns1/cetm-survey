import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { ITicket, Ticket, RuntimeEnvironment } from '../shared';
import { FeedbackDevice } from '../device';
import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';

@Injectable()
export class FeedbackService {

    constructor(
        private workspaceService: WorkspaceService,
        private feedbackDevice: FeedbackDevice,
        private env: RuntimeEnvironment
    ) {

    }

    enable() {
        this.feedbackDevice.enable();
        this.env.Auth.Data$.subscribe(d => {
            this.required = d.config.feedback.required;
        });
        return true;
    }

    private socket = this.workspaceService.Socket;
    private feedbackDone$ = this.socket.RxEvent<ITicket>("/feedback_done").map(t => t.id);
    private skipFeedback$ = new Subject<string>();
    promptForSkip$ = new BehaviorSubject<Ticket[]>([]);
    private required = false;

    SkipFeedback(t: Ticket) {
        this.promptForSkip$.next([]);
        this.skipFeedback$.next(t.id);
    }

    CancelSkipFeedback() {
        this.promptForSkip$.next([]);
        this.skipFeedback$.next(null);
    }

    // CheckFeedback:
    // return [] if can next
    // return null if not
    CheckFeedback(t: Ticket) {
        if (t) {
            console.log('bbbbbbbbbbb')
            var feedback = t.tracks[t.tracks.length - 1].feedback || null;
            if (feedback) {
                return false
            }else{
                return true
            }
        } else {
            return true
        }
        // if (!this.required || !this.feedbackDevice.Available) {
        //     return false;
        // }
        // return true;

    }
}