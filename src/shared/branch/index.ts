
import { RepeatedObservable } from './repeatable';
import { SelectedBranchIDLevel0 } from './branch';
import { Observable } from 'rxjs/Observable';

export function RefreshSelectedBranchIDLevel0<T>(func: (any) => Observable<T>) {
    return new RepeatedObservable<T>(SelectedBranchIDLevel0, func);
}

export * from './branch';
export * from './branch.module';

import { Branches } from './branch';

interface IModel { branch_id?: string, branch?: string }

import 'rxjs/add/operator/do';
export function AddBranchName<T extends IModel>(src: Observable<T[]>) {
    return src.do(models => {
        models.forEach(v => v.branch = Branches.get(v.branch_id).name || 'n/a');
    });
}