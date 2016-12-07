import { IUser, IBranch, Center } from '../../model/';
import { RxBranches } from '../branch/';

export interface IMySettings {
  me: IUser;
  branches: IBranch[];
  services: Center.IService[];
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxMySetting = new BehaviorSubject<IMySettings>(null);
export const RxUser = RxMySetting.filter(v => !!v).map(v => v.me);

import 'rxjs/add/operator/filter';

RxMySetting.filter(v => !!v).subscribe(v => {
  RxBranches.next(v.branches);
  Center.RxServices.next(v.services || []);
});
