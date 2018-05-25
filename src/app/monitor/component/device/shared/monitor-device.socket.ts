import { Injectable, Inject } from '@angular/core';
import { RuntimeEnvironment, AppSocket } from '../../shared';
import { LogService } from '../../shared';

@Injectable()
export class MonitorDeviceSocket extends AppSocket {
  constructor(
    private env: RuntimeEnvironment,
    logService: LogService,
  ) {
    super(`${env.Platform.WebSocketCETM}/room/monitor/join`, env.Debug.socket, logService);
  }

  onInit() {
    super.Connect({monit_type:'device'});
    this.KeepAlive();
  }

  onDestroy() {
    this.Terminate();
  }
}
