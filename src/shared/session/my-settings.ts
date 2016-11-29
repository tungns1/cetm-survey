import { IUser, IBranch } from '../../model/';
import { RxBranches } from '../branch/';

export interface IMySettings {
  me: IUser;
  branches: IBranch[];
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxMySetting = new BehaviorSubject<IMySettings>(null);
RxMySetting.filter(v => !!v).subscribe(v => RxBranches.next(v.branches));
