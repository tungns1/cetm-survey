import { Injectable } from '@angular/core';
import { LocalSetting } from '../../x/platform/setting';
import { LOCAL_SETTING_KEYS } from '../../config/const';

export interface ISession {
  user_id?: string;
  username?: string;
  scope?: string;
  role?: string;
  branch_id?: string;
  id?: string;
}

var sessionSetting = new LocalSetting<ISession>(LOCAL_SETTING_KEYS.SESSION);

export function Activate(session: ISession) {
  sessionSetting.save(session);
  RxCurrentSession.next(session);
}

export function Destroy() {
  sessionSetting.save({});
  RxCurrentSession.next({});
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const RxCurrentSession = new BehaviorSubject<ISession>(sessionSetting.data);
