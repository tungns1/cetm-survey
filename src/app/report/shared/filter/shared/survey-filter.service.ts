import { Injectable } from '@angular/core';
import {
    ICounter, IService, IUser,
    AddServiceName, USER_ROLES, IFeedback,
    CacheCounter, CacheUsers,
    // IDList, 
    HttpServiceGenerator, BranchFilterService, SmallStorage,
    RouterQueryStorageStrategy
} from '../../shared';
import { FeedbackSurveyService } from '../../../../admin/service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

const GROUP_BYS = {
    BRANCH_ID: 'branch_id',
    DEVICE_CODE: 'device_code',
    CHANNEL: 'channel',
    USER_ID: 'user_id'
}


export interface ISurveyFilter {
    channel: string[];
    device_code: string[];
    user_id: string[];
    expand: 'none' | 'channel' | 'device_code' | 'user_id';
}


@Injectable()
export class SurveyFilterService extends SmallStorage<ISurveyFilter> {
    constructor(
        storageStrategy: RouterQueryStorageStrategy,
        private httpServiceGenerator: HttpServiceGenerator,
        private branchFilter: BranchFilterService,
        private feedbackSurveyService: FeedbackSurveyService
    ) {
        super("survey", storageStrategy);
        this.onInit();
    }

    selectedChannel$ = new BehaviorSubject<string[]>([]);
    selectedDevice$ = new BehaviorSubject<string[]>([]);
    selectedUser$ = new BehaviorSubject<string[]>([]);

    protected onInit() {
        this.Update(this.data.channel, this.data.user_id, this.data.device_code);

        this.branchFilter.level0$.pipe(filter(b => b.length > 0), switchMap(branch_id => {
            return this.api.Get<any>("details", { branch_id: branch_id.join(',') });
        })).subscribe(d => {
            this.updateService(d.services || []);
            this.updateCounters(d.counters || []);
            this.updateUsers(d.users || []);
            // clear selection
            this.Update(this.data.channel, this.data.user_id, this.data.device_code);
            this.SaveData(true);
        });

        this.feedbackSurveyService.GetChanel().subscribe(res => {
            if (res) {
                this.channels$.next(res.data);
                this.selectedChannel$.next(this.data.channel);
                this.SaveData(true);
            }
        });

        this.branchFilter.level0$.subscribe(branch_id => {
            this.feedbackSurveyService.GetFeedbackList(branch_id).subscribe(res => {
                if (res) this.devices$.next(res.data);
            });
            if (branch_id.length > 1) {
                this.Update(this.data.channel, [], this.data.device_code);
            }
        });
    }

    Update(channel: string[] = [], user_id: string[] = [], device_code: string[] = []) {
        this.data.channel = channel;
        this.selectedChannel$.next(this.data.channel);
        this.data.device_code = device_code;
        this.selectedDevice$.next(this.data.device_code);
        this.data.user_id = user_id;
        this.selectedUser$.next(this.data.user_id);
        this.SaveData();
    }

    Expand(tab: 'channel' | 'device_code' | 'user_id') {
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

    channels$ = new ReplaySubject<string[]>(1);
    devices$ = new ReplaySubject<IFeedback[]>(1);

    ToQuery() {
        return {
            user_id: this.data.user_id.join(','),
            device_code: this.data.device_code.join(','),
            channel: this.data.channel.join(','),
            group_by: this.GetGroupBy()
        }
    }

    GetGroupBy() {
        if (this.data.device_code.length > 0) {
            return GROUP_BYS.DEVICE_CODE;
        }
        if (this.data.channel.length > 0) {
            return GROUP_BYS.CHANNEL;
        }
        if (this.data.user_id.length > 0) {
            return GROUP_BYS.USER_ID;
        }
        return GROUP_BYS.BRANCH_ID
    }

    GetActiveID() {
        if (this.data.device_code.length > 0) {
            return this.data.device_code;
        }
        if (this.data.channel.length > 0) {
            return this.data.channel;
        }
        if (this.data.user_id.length > 0) {
            return this.data.user_id;
        }
        return [];
    }

    GetActor() {
        if (this.Data.user_id && this.Data.user_id.length > 0)
            return 'uname';
        else if (this.Data.user_id && this.Data.device_code.length > 0)
            return 'device';
        else return 'store';
    }
    // Report timeline
    GetUser() {

        if (this.data.user_id.length > 0) {
            return this.data.user_id;
        }
        return [];
    }
    GetDevice() {
        if (this.data.device_code.length > 0) {
            return this.data.device_code;
        }
        return [];
    }
    //end Report timeline
}