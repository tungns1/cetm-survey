import { Injectable } from '@angular/core';
import { Setting } from '../../x/platform/setting';

export interface ISession {
  user_id?: string;
  username?: string;
  scope?: string;
  role?: string;
  branch_id?: string;
  id?: string;
}

const sessionKey = "_session_";
var sessionSetting = new Setting<ISession>(sessionKey);

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
