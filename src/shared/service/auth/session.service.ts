import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Platform } from '../../shared';
import { Const } from '../../shared';

export interface ISession {
  user_id?: string;
  username?: string;
  scope?: string;
  role?: string;
  branch_id?: string;
  id?: string;
}

var sessionSetting = new Platform.LocalSetting<ISession>(Const.LOCAL_SETTING_KEYS.SESSION);

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxCurrentSession = new BehaviorSubject<ISession>(sessionSetting.data);

@Injectable()
export class SessionService {
  constructor(private appService: AppService) {

  }

  Activate(session: ISession) {
    sessionSetting.save(session);
    RxCurrentSession.next(session);
  }

  Destroy() {
    sessionSetting.save({});
    RxCurrentSession.next({});
  }
}