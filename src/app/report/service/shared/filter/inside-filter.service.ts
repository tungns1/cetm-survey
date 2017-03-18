import { Injectable } from '@angular/core';
import {
    ICounter, IService, IUser,
    AddServiceName, USER_ROLES, 
    CacheCounter, CacheService, CacheUsers,
    IDList
} from '../../../../shared/model';
import { HttpApi } from '../../../../shared/service/backend';

import {
    BranchFilter, BranchFilterService,
    AbstractState, AbstractStateService, 
} from '../../../shared';

const GROUP_BYS = {
    BRANCH_ID: 'branch_id',
    COUNTER_ID: 'counter_id',
    USER_ID: 'user_id',
    SERVICE_ID: 'service_id'
}


export interface IInsideBranchFilter {
    user_id: string[];
    counter_id: string[];
    service_id: string[];
}


export class InsideBranchFilter extends AbstractState {
    FromQuery(p: Params) {
        this.service_id = new IDList(p['service_id']);
        this.counter_id = new IDList(p['counter_id']);
        this.user_id = new IDList(p['user_id']);
    }

    ToQuery() {
        return {
            service_id: this.service_id.toString(),
            counter_id: this.counter_id.toString(),
            user_id: this.user_id.toString(),
            group_by: this.GetGroupBy()
        }
    }

    SetValue(v: IInsideBranchFilter) {
        this.user_id.rebuild(v.user_id);
        this.counter_id.rebuild(v.counter_id);
        this.service_id.rebuild(v.service_id);
    }

    valueOf() {
        return {
            service_id: this.service_id.valueOf(),
            counter_id: this.counter_id.valueOf(),
            user_id: this.user_id.valueOf()
        }
    }

    GetGroupBy() {
        if (this.counter_id.length > 0) {
            return GROUP_BYS.COUNTER_ID;
        }
        if (this.user_id.length > 0) {
            return GROUP_BYS.USER_ID;
        }
        if (this.service_id.length > 0) {
            return GROUP_BYS.SERVICE_ID;
        }
        return GROUP_BYS.BRANCH_ID
    }

    GetActiveID() {
        if (this.counter_id.length > 0) {
            return this.counter_id.valueOf();
        }
        if (this.user_id.length > 0) {
            return this.user_id.valueOf();
        }
        if (this.service_id.length > 0) {
            return this.service_id.valueOf();
        }
        return [];
    }

    private service_id: IDList;
    private user_id: IDList;
    private counter_id: IDList;
}

import { Params, ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class InsideBranchFilterService extends AbstractStateService<InsideBranchFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilter: BranchFilterService
    ) {
        super(route);
        this.onInit(new InsideBranchFilter);
    }

    protected onInit(v: InsideBranchFilter) {
        super.onInit(v);
        CacheService.RxListView.subscribe(data => this.updateService(data));
        this.branchFilter.ValueChanges.throttleTime(250)
            .map(b => b.GetBranchIDByLevel(0))
            .switchMap(branch_id => {
                if (branch_id.length < 1) {
                    return of({});
                }
                return this.api.Get<any>("details", { branch_id: branch_id.join(',') });
            }).subscribe((d: any) => {
                this.updateService(d.services || []);
                this.updateCounters(d.counters || []);
                this.updateUsers(d.users || []);
            })
    }

    private updateService(services: IService[] = []) {
        services.sort((a, b) => a.name < b.name ? -1 : 1);
        services.forEach(AddServiceName);
        this.services$.next(services);
    }

    private updateUsers(users: IUser[] = []) {
        const role = USER_ROLES.STAFF;
        const staff = users.filter(u => u.role.indexOf(role) !== -1)
            .sort((a, b) => a.fullname < b.fullname ? -1 : 1);
        this.users$.next(staff);
        CacheUsers.Refresh(staff);
    }

    private updateCounters(counters: ICounter[] = []) {
        counters.sort((a, b) => a.name < b.name ? -1 : 1);
        this.counters$.next(counters);
        CacheCounter.Refresh(counters);
    }

    SetInsideInfilter(v: IInsideBranchFilter) {
        this.state.SetValue(v);
        this.triggerChange();
    }

    private api = new HttpApi("/api/auth");
    users$ = new ReplaySubject<IUser[]>(1);
    counters$ = new ReplaySubject<ICounter[]>(1);
    services$ = new ReplaySubject<IService[]>(1);
}