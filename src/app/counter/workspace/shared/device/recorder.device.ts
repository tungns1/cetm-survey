import { Injectable } from '@angular/core';
import { ITicket, QmsService } from './shared';



interface IRecordConfig {
    format: 'mp3';
    upload_url: string;
}

@Injectable()
export class RecorderDevice {
    constructor(
        private qmsService: QmsService
    ) { }

    enable(config: IRecordConfig) {
        this.qmsService.listen("/recorder/ready", () => {
            this.sendCommand("/start", config);
        });
        this.qmsService.__x.Broadcast("/recorder/enable", config);
        this.sendCommand("/query-ready", "");
    }

    disable() {
        this.qmsService.__x.Broadcast("/recorder/disable");
    }

    private sendCommand(uri: string, data: any) {
        this.qmsService.__x.Broadcast('/recorder/command', {
            uri, data
        });
    }

    /**
     *  Append the recording data to filename + format
     *  If filename is not present, the data is skipped
     * @param filename the file name for the data
     */

    AppendToFile(filename: string) {
        this.sendCommand("/append", filename);
    }

    SkipSaveToFile() {
        this.sendCommand("/skip", "");
    }

    SendFileMiss() {
        this.sendCommand("/miss", "");
    }

}