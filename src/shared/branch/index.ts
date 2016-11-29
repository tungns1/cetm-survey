
import { RepeatedObservable } from './repeatable';
import { SelectedBranchIDLevel0 } from './branch';
import { Observable } from 'rxjs/Observable';

export function RefreshSelectedBranchIDLevel0<T>(func: (any) => Observable<T>) {
    return new RepeatedObservable<T>(SelectedBranchIDLevel0, func);
}

export * from './branch';
export * from './branch.module';