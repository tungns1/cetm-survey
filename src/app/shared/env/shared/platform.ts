import { SmallStorage } from '../../shared';

interface IPlatformSerialize {
    host_cetm?: string;
    host_booking?: string;
    host_survey?: string;
    auto_login?: boolean
}

export class PlatformEnvStorage extends SmallStorage<IPlatformSerialize> {
    constructor() {
        super("platform");
    }

    private protocol = location.protocol;
    private ssl = this.protocol.startsWith("https");
    private wsProtocol = this.ssl ? "wss:" : "ws:";

    private get actualHostCETM() {
        // should not initialize with object
        return this.data.host_cetm || location.host;
    }

    private get actualHostBooking() {
        return this.data.host_booking || location.host;
    }

    Update(host_cetm: string, host_booking: string, host_survey: string) {
        this.data.host_cetm = host_cetm;
        this.data.host_booking = host_booking;
        this.data.host_survey = host_survey;
        this.SaveData();
    }

    get Http() {
        return `${this.protocol}//${this.actualHostCETM}`;
    }

    get HttpBooking() {
        return `${this.protocol}//${this.actualHostBooking}`;
    }

    get WebSocketCETM() {
        return `${this.wsProtocol}//${this.actualHostCETM}`;
    }
}
