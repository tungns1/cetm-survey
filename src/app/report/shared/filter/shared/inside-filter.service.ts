import { Injectable } from '@angular/core';
import {
    ICounter, IService, IUser,
    AddServiceName, USER_ROLES,
    CacheCounter, CacheService, CacheUsers,
    IDList, 
    HttpServiceGenerator,
    BranchFilterService,
    SmallStorage,
    RouterQueryStorageStrategy
} from '../../shared';



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
    expand: 'none' | 'user_id' | 'counter_id' | 'service_id';
}

import { ReplaySubject ,  of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';


@Injectable()
export class InsideBranchFilterService extends SmallStorage<IInsideBranchFilter> {
    constructor(
        storageStrategy: RouterQueryStorageStrategy,
        private httpServiceGenerator: HttpServiceGenerator,
        private branchFilter: BranchFilterService
    ) {
        super("inside", storageStrategy);
        this.onInit();
    }

    protected onInit() {
        this.Update(this.data.user_id, this.data.service_id, this.data.counter_id);
        
        this.branchFilter.level0$.pipe(filter(b => b.length !== 1)).subscribe(_ => {
            this.updateService(CacheService.RxListView.value);
            this.updateCounters([]);
            this.updateUsers([]);
            // clear selection
            this.Update([], this.data.service_id, []);
            this.EmitEvent();
        });
        this.branchFilter.level0$.pipe(filter(b => b.length === 1)).pipe(switchMap(branch_id => {
            return this.api.Get<any>("details", { branch_id: branch_id.join(',') });
        })).subscribe((d: any) => {
            this.updateService(d.services || []);
            this.updateCounters(d.counters || []);
            this.updateUsers(d.users || []);
            // clear selection
            this.Update([], this.data.service_id, []);
            this.EmitEvent();
        });
    }

    Update(user_id: string[] = [], service_id: string[] = [], counter_id: string[] = []) {
        this.data.user_id = user_id;
        this.data.counter_id = counter_id;
        this.data.service_id = service_id;
        this.SaveData();
    }

    Expand(tab: 'user_id' | 'counter_id' | 'service_id') {
        if (this.data.expand === tab) {
            return;
        }
        this.data.expand = tab || 'none';
        this.SaveData();
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
        CacheCounter.Refresh(counters);
        this.counters$.next(counters);
    }

    private api = this.httpServiceGenerator.make("/api/auth");
    users$ = new ReplaySubject<IUser[]>(1);
    counters$ = new ReplaySubject<ICounter[]>(1);
    services$ = new ReplaySubject<IService[]>(1);

    ToQuery() {
        return {
            service_id: this.data.service_id.join(','),
            counter_id: this.data.counter_id.join(','),
            user_id: this.data.user_id.join(','),
            group_by: this.GetGroupBy()
        }
    }

    GetGroupBy() {
        if (this.data.counter_id.length > 0) {
            return GROUP_BYS.COUNTER_ID;
        }
        if (this.data.user_id.length > 0) {
            return GROUP_BYS.USER_ID;
        }
        if (this.data.service_id.length > 0) {
            return GROUP_BYS.SERVICE_ID;
        }
        return GROUP_BYS.BRANCH_ID
    }

    GetActiveID() {
        if (this.data.counter_id.length > 0) {
            return this.data.counter_id;
        }
        if (this.data.user_id.length > 0) {
            return this.data.user_id;
        }
        if (this.data.service_id.length > 0) {
            return this.data.service_id;
        }
        return [];
    }
}