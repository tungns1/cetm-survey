import { Injectable, Inject } from '@angular/core';
import { RuntimeEnvironment, AppSocket, LogService, CounterSettingService } from './shared';

@Injectable()
export class WorkspaceSocket extends AppSocket {
    constructor(
        private env: RuntimeEnvironment,
        private counterSetting: CounterSettingService,
        logService: LogService,
    ) {
        super(`${env.Platform.WebSocket}/room/counter/join`, env.Debug.socket, logService);
    }

    onInit() {
        super.Connect(this.counterSetting.Data);
    }

    onDestroy() {
        this.Terminate();
    }
}
