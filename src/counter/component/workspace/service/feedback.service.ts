import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { ITicket, SharedService } from '../../shared';
import { IsFeedbackDeviceAvailable } from '../../../device';
import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { timer } from 'rxjs/observable/timer';

@Injectable()
export class FeedbackService {

    constructor(
        private workspaceService: WorkspaceService,
        private authService: SharedService.Auth.AuthService
    ) {
        this.onInit();
    }

    private onInit() {
        this.authService.RxMySetting.subscribe(s => {
            this.required = s.config.feedback.required;
        })
    }

    private socket = this.workspaceService.Socket;
    private feedbackDone$ = this.socket.RxEvent<ITicket>("/feedback_done");
    private skipFeedback$ = new ReplaySubject<string>(4, 1000);
    promptForSkip$ = new BehaviorSubject<ITicket>(null);
    private required = false;

    SkipFeedback(t: ITicket) {
        this.promptForSkip$.next(null);
        this.skipFeedback$.next(t.id);
    }

    CheckFeedback(t: ITicket) {
        if (!this.required || !IsFeedbackDeviceAvailable()) {
            return of(t);
        }

        // check if done
        return this.feedbackDone$.filter(d => d.id === t.id)
            .merge(timer(100).first().switchMap(_ => {
                // ask to skip
                this.promptForSkip$.next(t);
                // skip feedback
                return this.skipFeedback$.filter(id => id === t.id)
            }))
            .map(_ => t).first();
    }

}