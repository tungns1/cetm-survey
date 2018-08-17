import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { ITicket, Ticket, RuntimeEnvironment } from '../shared';
import { FeedbackDevice } from '../device';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, first } from 'rxjs/operators';

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
        this.env.Auth.Data$.pipe(first()).subscribe(d => {
            this.required = d.config.feedback.required || false;
        });
        return true;
    }

    private socket = this.workspaceService.Socket;
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