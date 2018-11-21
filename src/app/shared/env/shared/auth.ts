import {
    AppStorage, ProjectConfig,
    AbstractSerializable, AbstractStorageStrategy, SmallStorage
} from '../../shared';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUser, IBranch, IService, IBranchConfig, CacheBranch, CacheService } from '../../model';
import { filter, share, publishReplay, refCount, map } from 'rxjs/operators';
import { IServiceGroup, CacheServiceGroup } from '../../model/center/service';

interface IAuthEnv {
    branch: string;
    store: string;
    module: string;
    sub_module: string;
    me: IUser;
    branches: IBranch[];
    services: IService[];
    config: IBranchConfig;
}

@Injectable()
export class AuthEnvStorage {
    Data$ = new ReplaySubject<IAuthEnv>(1);
    User$ = this.Data$.pipe(
        map(d => d.me)
        ,filter(u => !!u)
        ,share()
        ,publishReplay(1)
        ,refCount());
    private data: IAuthEnv = <any>{};

    emitChange() {
        this.Data$.next(this.data);
    }

    set Module(m: string) {
        this.data.module = m;
        this.emitChange();
    }

    set SubModule(m: string) {
        this.data.sub_module = m;
        this.emitChange();
    }

    Update(me: IUser, branches: IBranch[], services: IService[], config: IBranchConfig, service_group: IServiceGroup[]) {
        const data = this.data;
        Object.assign(data, { me, branches, services, config, service_group });
        CacheBranch.Refresh(branches);
        CacheService.Refresh(services);
        CacheServiceGroup.Refresh(service_group);
        const store = CacheBranch.GetByID(me.branch_id);
        data.store = store ? store.name : "";
        const branch = CacheBranch.GetByID(store ? store.parent : "");
        data.branch = branch ? branch.name : "";
        // update priority
        ProjectConfig.priority.__update(data.config.priority);
        ProjectConfig.counter.__update(data.config.counter);
        this.emitChange();
    }

    Me() {
        return this.data.me;
    }
}