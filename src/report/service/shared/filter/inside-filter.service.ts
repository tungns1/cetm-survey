import { Injectable } from '@angular/core';
import { SharedService, Model, Branch } from '../../../shared/';

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


export class InsideBranchFilter extends Model.SharedModel.AbstractState {
    FromQuery(p: Params) {
        this.service_id = new Model.SharedModel.IDList(p['service_id']);
        this.counter_id = new Model.SharedModel.IDList(p['counter_id']);
        this.user_id = new Model.SharedModel.IDList(p['user_id']);
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
        if (this.service_id.length > 0) {
            return GROUP_BYS.SERVICE_ID;
        }
        if (this.counter_id.length > 0) {
            return GROUP_BYS.COUNTER_ID;
        }
        if (this.user_id.length > 0) {
            return GROUP_BYS.USER_ID;
        }
        return GROUP_BYS.BRANCH_ID
    }

    private service_id: Model.SharedModel.IDList;
    private user_id: Model.SharedModel.IDList;
    private counter_id: Model.SharedModel.IDList;
}

import { Params, ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class InsideBranchFilterService extends Model.SharedModel.AbstractStateService<InsideBranchFilter> {
    constructor(
        route: ActivatedRoute,
        private branchFilter: Branch.BranchFilterService
    ) {
        super(route);
        this.onInit(new InsideBranchFilter);
    }

    protected onInit(v: InsideBranchFilter) {
        super.onInit(v);
        Model.Center.CacheService.RxListView.subscribe(data => this.updateService(data));
        this.branchFilter.ValueChanges.throttleTime(250)
            .map(b => b.GetBranchIDByLevel(0))
            .switchMap(branch_id => {
                if (branch_id.length < 1) {
                    return of({});
                }
                return this.api.Get<any>("details", { branch_id: branch_id.join(',') });
            }).subscribe(d => {
                this.updateService(d.services || []);
                this.updateCounters(d.counters || []);
                this.updateUsers(d.users || []);
            })
    }

    private updateService(services: Model.Center.IService[] = []) {
        services.sort((a, b) => a.name < b.name ? -1 : 1);
        services.forEach(Model.Center.AddServiceName);
        this.services$.next(services);
    }

    private updateUsers(users: Model.Org.IUser[] = []) {
        users.sort((a, b) => a.fullname < b.fullname ? -1 : 1);
        this.users$.next(users);
    }

    private updateCounters(counters: Model.House.ICounter[] = []) {
        counters.sort((a, b) => a.name < b.name ? -1 : 1);
        this.counters$.next(counters);
    }

    SetInsideInfilter(v: IInsideBranchFilter) {
        this.state.SetValue(v);
        this.triggerChange();
    }

    private api = new SharedService.Backend.HttpApi("/api/auth");
    users$ = new ReplaySubject<Model.Org.IUser[]>(1);
    counters$ = new ReplaySubject<Model.House.ICounter[]>(1);
    services$ = new ReplaySubject<Model.Center.IService[]>(1);
}