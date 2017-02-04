import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxCalledTickets, RxWaitingTickets, RxSummary, SetBranchID } from './focus.model';
import { socket, Focus } from '../backend';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html'
})
export class FocusComponent {
    constructor(private router: ActivatedRoute) { }
    ngOnInit() {
        const branch_id = this.router.snapshot.params['branch_id']
        SetBranchID(branch_id);
        this.subs.push(RxSummary.subscribe(s => this.summary = s));
        this.subs.push(socket.OnConnected(() => Focus.FocusOnBranch(branch_id)));
    }

    ngOnDestroy() {
        Focus.Unfocus();
        while (this.subs.length > 0) {
            let s = this.subs.pop();
            s.unsubscribe();
        }
    }

    waiting = RxWaitingTickets;
    called = RxCalledTickets;
    private summary = RxSummary.value;
    private subs: ISubscription[] = [];
}