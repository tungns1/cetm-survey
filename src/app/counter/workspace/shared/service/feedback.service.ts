import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { ITicket, Ticket, RuntimeEnvironment } from '../shared';
import { FeedbackDevice } from '../device';
import { of ,  ReplaySubject ,  BehaviorSubject ,  Subject ,  timer } from 'rxjs';
import { map } from 'rxjs/operators';

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
    private feedbackDone$ = this.socket.RxEvent<ITicket>("/feedback_done").pipe(map(t => t.id));
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
            var feedback = t.tracks[t.tracks.length - 1].feedback || null;
            if (feedback) {
                return false
            } else {
                if (!this.required) {
                    return false;
                }
                return true;
            }
        }
        // if (!this.required || !this.feedbackDevice.Available) {
        //     return false;
        // }
        // return true;

    }
}