import { IUser, IBranch, Center, RxUsers } from '../../model/';
import { RxBranches } from '../branch/';

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
  RxBranches.next(v.branches);
  Center.RxServices.next(v.services || []);
  RxUsers.next(v.users);
});

export const RxSessionReady = RxMySetting.filter(s => !!s);

