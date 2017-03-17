import { Injectable } from '@angular/core';
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

@Injectable()
export class SessionService {
  constructor() {
    this.sessionSetting = new Platform.LocalSetting<ISession>(Const.LOCAL_SETTING_KEYS.SESSION);
  }

  Activate(session: ISession) {
    this.sessionSetting.save(session);
    RxCurrentToken.next(session.id);
  }

  Destroy() {
    this.sessionSetting.save({});
    RxCurrentToken.next('');
  }

  GetToken() {
    return this.sessionSetting.data.id;
  }

  private sessionSetting: Platform.LocalSetting<ISession>;
}


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxCurrentToken = new BehaviorSubject<string>('');