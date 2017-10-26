import { Injectable, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { RuntimeEnvironment, AppSocket, LogService, SuperCounterSettingService } from '../../shared';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SuperCounterSocket extends AppSocket {
    constructor(
        private router: Router,
        private snackBard: MatSnackBar,
        private env: RuntimeEnvironment,
        private counterSetting: SuperCounterSettingService,
        logService: LogService,
    ) {
        super(`${env.Platform.WebSocket}/room/actor/join`, env.Debug.socket, logService);
    }

    onInit() {
        var setting = this.counterSetting.Data;
        var user = this.env.Auth.Me();
        super.Connect({
            branch_code: setting.branch_code,
            actor_type: "superbox",
            user_id: user.id
        });
        this.error$.subscribe(e => {
            if (e.uri.startsWith("/system")) {
                const message = `Application Error ${e.err || JSON.stringify(e)}`;
                new Notification("Application Error", {
                    body: message
                });
                const md = this.snackBard.open(message, "Click here to Check Configuration");
                md.onAction().first().subscribe(_ => {
                    this.router.navigate(["/counter/superCounterSetting"]);
                });
            }
        });
        super.KeepAlive();
    }

    onDestroy() {
        this.Terminate();
    }
}