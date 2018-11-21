import { Injectable } from '@angular/core';
import { LogService, RuntimeEnvironment } from '../../shared';
import { BehaviorSubject } from 'rxjs';
import { IMonitorSurvey } from './monitor-survey.model';

@Injectable()
export class MonitorSurveySocket {
    constructor(
        logService: LogService,
        private env: RuntimeEnvironment
    ) {
    }
    
    private ws: WebSocket;
    message$ = new BehaviorSubject<IMonitorSurvey>(null);

    onInit() {
        this.connect();
    }

    onDestroy() {
        this.ws.close();
    }

    private connect() {
        if (this.ws == null) {
            this.ws = new WebSocket('ws://' + this.env.generateHostSurvey() + '/socket/join?id=admin');
        }
        this.ws.onmessage = (message) => {
            this.message$.next(JSON.parse(message.data));
        };
    }

    send(param: any) {
        this.ws.send(param)
    }
}
