import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import { SharedService, Model, Branch } from '../shared';

interface IDetais {
    users: Model.Org.IUser[];
    counters: Model.House.ICounter[];
    services: Model.Center.IService[];
}

import { IAppState, ACTION } from '../reducers';

@Injectable()
export class FocusBranchService {
    constructor(private store: Store<IAppState>) {
        this.onInit();
    }

    private onInit() {

        Model.Center.CacheService.RxListView.subscribe(services => {
            services.sort((a, b) => a.name > b.name ? 1 : -1);
            this.store.dispatch({
                type: ACTION.FOCUS_UPDATE,
                payload: { services }
            })
        });

        Branch.SelectedBranchIDLevel0.filter(id => !!id).switchMap(id => {
            return this.api.Get<IDetais>("details", { branch_id: id });
        }).subscribe(details => {
            const counters = (details.counters || []).sort((a, b) => a.name > b.name ? 1 : -1);
            const users = (details.users || [])
                .sort((a, b) => a.fullname > b.fullname ? 1 : -1)
                .filter(u => u.role === 'staff');

            this.store.dispatch({
                type: ACTION.FOCUS_UPDATE,
                payload: { users, counters }
            })
        })
    }

    private api = new SharedService.Backend.HttpApi("/api/auth");
}