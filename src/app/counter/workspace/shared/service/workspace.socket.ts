import { Injectable, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { RuntimeEnvironment, AppSocket, LogService } from './shared';
import { MatSnackBar } from '@angular/material';
import { WorkspaceSettingService } from '../counter-setting.service';

@Injectable()
export class WorkspaceSocket extends AppSocket {
    constructor(
        private router: Router,
        private mdSnackBard: MatSnackBar,
        private env: RuntimeEnvironment,
        private counterSetting: WorkspaceSettingService,
        logService: LogService,
    ) {
        super(`${env.Platform.WebSocketCETM}/room/actor/join`, env.Debug.socket, logService);
    }

    onInit() {
        var setting = this.counterSetting.Data;
        var user = this.env.Auth.Me();
        super.Connect({
            branch_code: setting.branch_code,
            actor_type: "counter",
            counter_code: setting.counter_code,
            user_id: user.id
        });
        this.error$.subscribe(e => {
            if (e.uri.startsWith("/system")) {
                const message = `Application Error ${e.err || JSON.stringify(e)}`;
                new Notification("Application Error", {
                    body: message
                });
                const md = this.mdSnackBard.open(message
                    // , "Click here to Check Configuration"
                );
                // md.onAction().first().subscribe(_ => {
                //     this.router.navigate(["/counter/setting"]);
                // });
            }
        });
        super.KeepAlive();
    }

    onDestroy() {
        this.Terminate();
    }
}
