import { IUser, IBranch, Center, RxUsers } from '../../model/';
import { SetBranches } from '../branch/';

export interface IMySettings {
  me: IUser;
  branches: IBranch[];
  services: Center.IService[];
  users: IUser[];
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxMySetting = new BehaviorSubject<IMySettings>(null);
export const RxLoginedUser = RxMySetting.filter(v => !!v).map(v => v.me);

import 'rxjs/add/operator/filter';

RxMySetting.filter(v => !!v).subscribe(v => {
  v.services.sort((a, b) => a.name > b.name ? 1 : 0);
  Center.RxServices.next(v.services || []);
  RxUsers.next(v.users);
  SetBranches(v.branches, v.me.branch_id);
});

export const RxSessionReady = RxMySetting.filter(s => !!s);

