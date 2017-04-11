import { Injectable } from '@angular/core';
import { ITicket, QmsService } from './shared';

@Injectable()
export class RecorderDevice { 
    constructor(
        private qmsService: QmsService
    ) {}

    Start() {
        this.qmsService.__x.Send("/recorder/start");
    }

    Stop() {
        this.qmsService.__x.Send("/recorder/stop");
    }
    
    AppendToFile(filename: string) {
        this.qmsService.__x.Send("/recoder/append", filename);
    }
}