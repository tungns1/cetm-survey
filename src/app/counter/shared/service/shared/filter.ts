
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AbstractState, AbstractStateService
} from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class CounterState extends AbstractState {
    FromQuery(p: Params) {
        this.branch_code = p['branch_code'];
        this.counter_code = p['counter_code'];
    }

    ToQuery() {
        return {
            branch_code: this.branch_code,
            counter_code: this.counter_code
        }
    }

    GetBranchAndCounter() {
        return {
            branch_code: this.branch_code,
            counter_code: this.counter_code
        }
    }

    SetBranchAndCounter(branch_code: string, counter_code: string) {
        this.branch_code = branch_code;
        this.counter_code = counter_code;
    }

    private branch_code: string;
    private counter_code: string;

}

@Injectable()
export class CounterStateService extends AbstractStateService<CounterState> {
    constructor(
        route: ActivatedRoute
    ) {
        super(route);
        this.onInit(new CounterState);
    }

    SetBranchAndCounter(branch_code: string, counter_code: string) {
        this.Current.SetBranchAndCounter(branch_code, counter_code);
        this.triggerChange();
    }
}