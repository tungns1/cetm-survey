import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
    BranchCrudApiService, ICounter, IUser,
    BranchCrudApiServiceGenerator, IBranchConfig
} from '../shared';
import { RuntimeEnvironment, AppStorage } from '../../shared';

export interface IStaffPosition {
    counter_user_configs: ICounterUserConfigs[];
    counters: ICounter[];
    users: IUser[];
}
export interface ICounterUserConfigs {
    id?: string;
    mtime?: number;
    dtime?: number;
    counter_id: string;
    branch_id: string;
    user_id: string;
}

@Injectable()
export class MetaService {
    constructor(
        protected bcsg: BranchCrudApiServiceGenerator,
        private http: HttpClient,
        private env: RuntimeEnvironment
    ) {
        this.onInit();
    }

    BranchConfigService: BranchCrudApiService<IBranchConfig>;

    Link = {
        BranchConfig: '/api/admin/setting/branch_config',
        StaffPosition: '/api/admin/setting/user_counter_config',
    }

    private onInit() {
        this.BranchConfigService = this.bcsg.make<IBranchConfig>(this.Link.BranchConfig);
    }

    private generateHostName() {
        let host = this.env.Platform.Data.host_cetm || window.location.host;
        return 'http://' + host;
    }

    GetStaffPos(branchId: string): Observable<IStaffPosition> {
        let params = new HttpParams().set('token', AppStorage.Token)
            .set('branch_id', branchId)
        return this.http.get(this.generateHostName() + this.Link.StaffPosition + '/get', { params: params }).map(res => res['data']);
    }

    SetStaffPos(data: ICounterUserConfigs[]): Observable<any> {
        return this.http.post(this.generateHostName() + this.Link.StaffPosition + '/create?token=' + AppStorage.Token, { data: data });
    }

    UpdateStaffPos(data: ICounterUserConfigs[], oldConfigs: ICounterUserConfigs[]) {
        var editData: ICounterUserConfigs[] = [];
        var addNewData: ICounterUserConfigs[] = [];
        data.forEach(config => {
            let old = oldConfigs.find(oldConfig => oldConfig.counter_id === config.counter_id);
            if (old) {
                config.id = old.id;
                editData.push(config)
            } else {
                addNewData.push(config)
            }
        })
        if (editData.length)
            this.http.post(this.generateHostName() + this.Link.StaffPosition + '/update?token=' + AppStorage.Token, { data: editData }).subscribe(d => console.log(d));
        if (addNewData.length)
            this.http.post(this.generateHostName() + this.Link.StaffPosition + '/create?token=' + AppStorage.Token, { data: addNewData }).subscribe(d => console.log(d));
    }
}