import { IUser, IBranch, Center, IConfig } from '../../model/';
import { SetBranches } from '../../branch/';

export interface IMySettings {
  me: IUser;
  branches: IBranch[];
  services: Center.IService[];
  config: IConfig;
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxMySetting = new BehaviorSubject<IMySettings>(null);
export const RxLoginedUser = RxMySetting.filter(v => !!v).map(v => v.me);

import 'rxjs/add/operator/filter';

RxMySetting.filter(v => !!v).subscribe(v => {
  Center.CacheService.Refresh(v.services);
  if (v.me.branch_id) {
    SetBranches(v.branches, v.me.branch_id);
  }
});

export const RxSessionReady = RxMySetting.filter(s => !!s);

