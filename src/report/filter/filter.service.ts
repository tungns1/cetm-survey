import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Model, Backend, Branch } from '../shared/';

const backend = new Backend.HttpApi("/api/auth");

const now = Math.floor(Date.now() / 111);

// import 'rxjs/add/operator/switchMap';

const RxDetails = Branch.SelectedBranchIDLevel0.filter(id => !!id).switchMap(id => {
    return backend.Get("details", { branch_id: id });
});

export const RxServices = new BehaviorSubject<Model.Center.IService[]>([]);
export const RxUsers = new BehaviorSubject<Model.IUser[]>([]);
export const RxCounters = new BehaviorSubject<Model.House.ICounter[]>([]);
export const NameMap = new Map<string, string>();

Model.Center.RxServices.subscribe(services => {
    services.forEach(r => Model.Center.AddServiceName(r));
    services.sort((a, b) => a.name > b.name ? 1 : -1);
    RxServices.next(services);
    services.forEach(s => NameMap.set(s.id, s.name));
})

RxDetails.subscribe(v => {
    const counters: Model.House.ICounter[] = v['counters'];
    counters.sort((a, b) => a.name > b.name ? 1 : -1);
    RxCounters.next(counters);
    const users: Model.IUser[] = v['users'];
    users.sort((a, b) => a.fullname > b.fullname ? 1 : -1);
    RxUsers.next(users);
    users.forEach(u => NameMap.set(u.id, u.fullname));
    counters.forEach(c => NameMap.set(c.id, c.name));
})

Branch.RxBranches.subscribe(branches => branches.forEach(b => NameMap.set(b.id, b.name)));

function GetSelected(value: { id?: string, _checked?: boolean }[]) {
    return value.filter(v => v._checked).map(v => v.id);
}

export function GetServices() {
    return RxServices.value.filter(v => v._checked).map(v => v.id);
}
export function GetBranch() {
    return Branch.RxBranches.value.filter(v => v._checked && v.level===0).map(v => v.id);
}

export function GetCounters() {
    return GetSelected(RxCounters.value);
}

export function GetUsers() {
    return GetSelected(RxUsers.value.map(v=>v.role==='staff'));
}

export const RxGroupBy = new BehaviorSubject<string>('branch_id');
export const RxPeriod = new BehaviorSubject<string>('day');

const Titles = {
    branch_id: "PGD",
    service_id: 'Dịch vụ',
    counter_id: 'Quầy GD',
    user_id: 'Nhân viên'
}

export const RxGroupTitle = RxGroupBy.map(group => Titles[group]);