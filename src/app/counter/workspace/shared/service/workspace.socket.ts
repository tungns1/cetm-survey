import { Injectable, Inject } from '@angular/core';
import { RuntimeEnvironment, AppSocket, LogService, CounterSettingService } from './shared';

@Injectable()
export class WorkspaceSocket extends AppSocket {
    constructor(
        private env: RuntimeEnvironment,
        private counterSetting: CounterSettingService,
        logService: LogService,
    ) {
        super(`${env.Platform.WebSocket}/room/actor/join`, env.Debug.socket, logService);
    }

    onInit() {
        var setting = this.counterSetting.Data;
        var user = this.env.Auth.Me();
        // super.NoLoading();
        super.Connect({
            branch_code: setting.branch_code,
            actor_type: "counter",
            counter_code: setting.counter_code,
            user_id: user.id
        });
    }

    onDestroy() {
        this.Terminate();
    }
}
