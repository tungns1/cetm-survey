import { Injectable, Inject } from '@angular/core';
import { RuntimeEnvironment, AppSocket } from '../../shared';
import { LogService } from '../../shared';

@Injectable()
export class MonitorTicketSocket extends AppSocket {
  constructor(
    private env: RuntimeEnvironment,
    logService: LogService,
  ) {
    super(`${env.Platform.WebSocket}/room/monitor/join`, env.Debug.socket, logService);
  }

  onInit() {
    super.Connect({});
    this.KeepAlive();
  }

  onDestroy() {
    this.Terminate();
  }
}
