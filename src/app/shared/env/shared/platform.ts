import {
    AbstractSerializable, SmallStorage, AbstractStorageStrategy
} from '../../shared';

interface IPlatformSerialize {
    host_cetm?: string;
    host_booking?: string;
    host_survey?: string;
    auto_login?: boolean;
}

export class PlatformEnvStorage extends SmallStorage<IPlatformSerialize> {
    constructor() {
        super("platform");
    }

    private get actualHostCETM() {
        // should not initialize with object
        return this.data.host_cetm || location.host;
    }

    private get actualHostBooking() {
        // should not initialize with object
        return this.data.host_booking || location.host;
    }

    Update(host_cetm: string, host_booking: string, host_survey: string, auto_login = false) {
        this.data.host_cetm = host_cetm;
        this.data.host_booking = host_booking;
        this.data.host_survey = host_survey;
        this.data.auto_login = auto_login
        // console.log(this.data)
        this.SaveData();
    }

    get HttpCETM() {
        // console.log(`${this.protocol}//${this.actualHostCETM}`)
        return `${this.protocol}//${this.actualHostCETM}`;
    }

    get HttpBooking() {
        // console.log(`${this.protocol}//${this.actualHostCETM}`)
        return `${this.protocol}//${this.actualHostBooking}`;
    }

    get WebSocketCETM() {
        return `${this.wsProtocol}//${this.actualHostCETM}`;
    }

    private protocol = location.protocol;
    private ssl = this.protocol.startsWith("https");
    private wsProtocol = this.ssl ? "wss:" : "ws:";
}
