import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Model, Backend, Branch } from '../shared/';

const backend = new Backend.HttpApi("/api/auth");

const now = Math.floor(Date.now() / 111);

// import 'rxjs/add/operator/switchMap';

const RxDetails = Branch.SelectedBranchIDLevel0.filter(id => !!id).switchMap(id => {
    return backend.Get("details", { branch_id: id });
});

export const RxServices = new BehaviorSubject<Model.IService[]>([]);
export const RxUsers = new BehaviorSubject<Model.IUser[]>([]);
export const RxCounters = new BehaviorSubject<Model.ICounter[]>([]);
export const NameMap = new Map<string, string>();
RxDetails.subscribe(v => {
    const services: Model.IService[] = v['services'];
    services.forEach(r => Model.AddServiceName(r));
    services.sort((a, b) => a.name > b.name ? 1 : 0);
    RxServices.next(services);
    const counters: Model.ICounter[] = v['counters'];
    counters.sort((a, b) => a.name > b.name ? 1 : 0);
    RxCounters.next(counters);
    const users: Model.IUser[] = v['users'];
    users.sort((a, b) => a.fullname > b.fullname ? 1 : 0);
    RxUsers.next(users);
    services.forEach(s => NameMap[s.code] = s.name);
    users.forEach(u => NameMap[u.id] = u.fullname);
    counters.forEach(c => NameMap[c.id] = c.name);
})

Branch.RxBranches.subscribe(branches => branches.forEach(b => NameMap[b.id] = b.name));

function GetSelected(value: { id?: string, _checked?: boolean }[]) {
    return value.filter(v => v._checked).map(v => v.id);
}

export function GetServices() {
    return RxServices.value.filter(v => v._checked).map(v => v.code);
}

export function GetCounters() {
    return GetSelected(RxCounters.value);
}

export function GetUsers() {
    return GetSelected(RxUsers.value);
}

export const RxGroupBy = new BehaviorSubject<string>('branch_id');

const Titles = {
    branch_id: "PGD",
    scode: 'Dịch vụ',
    counter_id: 'Quầy GD',
    user_id: 'Nhân viên'
}

export const RxGroupTitle = RxGroupBy.map(group => Titles[group]);