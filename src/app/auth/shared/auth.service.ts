import { Injectable } from '@angular/core';
import { HttpServiceGenerator, AppStorage, RuntimeEnvironment } from './shared';

interface IAuthOption {
  scope: string;
  branch_code: string;
  username: string;
  password: string;
  auto_login: boolean;
}

interface ISession {
  id?: string;
}

interface ILoginReply {
  session: ISession;
}

import { IUser, IBranch, IService, IBranchConfig } from './shared';

interface IMySettings {
  me: IUser;
  branches: IBranch[];
  services: IService[];
  config: IBranchConfig;
}

@Injectable()
export class AuthService {

  constructor(
    private hsg: HttpServiceGenerator,
    private env: RuntimeEnvironment
  ) { }

  Login(option: IAuthOption) {
    return this.authApi.Post<ILoginReply>("login", {}, option)
      .do(data => {
        AppStorage.Token = data.session.id;
      });
  }

  Logout() {
    return this.authApi.Post("logout");
  }

  ValidateSession(scope?: string, token?: string) {
    return this.authApi.Get<IMySettings>(
      "my_settings",
      { scope: scope || 'admin', token: token || AppStorage.Token }
    ).do(data => {
      this.env.Auth.Update(
        data.me, data.branches, data.services, data.config
      );
    });
  }

  private authApi = this.hsg.make("/api/auth");
}
