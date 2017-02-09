import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { SharedService, Model, Branch } from '../shared';

function GetSelected(value: { id?: string, _checked?: boolean }[]) {
    return value.filter(v => v._checked).map(v => v.id);
}

interface IDetais {
    users: Model.IUser[];
    counters: Model.House.ICounter[];
    services: Model.Center.IService[];
}

@Injectable()
export class FocusBranchService {
    constructor() {
        this.onInit();
    }

    RxServices = new BehaviorSubject<Model.Center.IService[]>([]);

    private onInit() {
        Model.Center.CacheService.RxListView.subscribe(services => {
            services.sort((a, b) => a.name > b.name ? 1 : -1);
            this.RxServices.next(services);
        });

        Branch.SelectedBranchIDLevel0.filter(id => !!id).switchMap(id => {
            return this.api.Get<IDetais>("details", { branch_id: id });
        }).subscribe(details => {
            const counters = details.counters.sort((a, b) => a.name > b.name ? 1 : -1);
            const users = details.users
                .sort((a, b) => a.fullname > b.fullname ? 1 : -1)
                .filter(u => u.role === 'staff');
            this.RxDetails.next({
                services: this.RxServices.value,
                users: users,
                counters: counters
            })
        })
    }

    GetDetails() {
        return {
            services: this.RxServices.value.filter(v => v._checked).map(v => v.id),
            counters: GetSelected(this.RxDetails.value.counters),
            users: GetSelected(this.RxDetails.value.users)
        }
    }

    RxDetails = new BehaviorSubject<IDetais>(<any>{});
    private api = new SharedService.Backend.HttpApi("/api/auth");

}