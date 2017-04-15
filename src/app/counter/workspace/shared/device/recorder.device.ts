import { Injectable } from '@angular/core';
import { ITicket, QmsService } from './shared';

@Injectable()
export class RecorderDevice { 
    constructor(
        private qmsService: QmsService
    ) {}

    Start(format = 'mp3') {
        this.qmsService.__x.Send("/recorder/start", format);
    }

    Stop() {
        this.qmsService.__x.Send("/recorder/stop");
    }

    private sendCommand(command: string, data: any) {
        this.qmsService.__x.Send('/recorder/command', {
            command, data
        });
    }

    /**
     *  Append the recording data to filename + format
     *  If filename is not present, the data is skipped
     * @param filename the file name for the data
     */
    
    AppendToFile(filename: string) {
        this.sendCommand("append", filename);
    }

    SkipSaveToFile() {
        this.sendCommand("skip", "");
    }
}