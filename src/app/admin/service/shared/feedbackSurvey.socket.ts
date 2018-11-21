import { Injectable, Inject } from '@angular/core';
import { RuntimeEnvironment } from '../../../shared';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FeedbackSurveySocket {

    constructor(
        private env: RuntimeEnvironment
    ) { }

    private ws: WebSocket;
    message$ = new BehaviorSubject(null);
    connect(param: any) {
        const uri = JSON.stringify(param);
        if (this.ws == null) {
            this.ws = new WebSocket('ws://' + this.env.generateHostSurvey() + '/socket/join?id=admin');
        }
        this.ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            // console.log(data)
            this.message$.next(data);
        };
    }
    send(param: any) {
        this.ws.send(param)
    }
}
