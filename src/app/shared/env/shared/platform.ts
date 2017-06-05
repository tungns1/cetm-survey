import {
    AbstractSerializable, SmallStorage, AbstractStorageStrategy
} from '../../shared';

interface IPlatformSerialize {
    host?: string;
}

export class PlatformEnvStorage extends SmallStorage<IPlatformSerialize> {
    constructor() {
        super("platform");
    }

    private get actualHost() {
        // should not initialize with object
        return this.data.host || location.host;
    }

    Update(host: string) {
        this.data.host = host;
        this.SaveData();
    }

    get Http() {
        return `${this.protocol}//${this.actualHost}`;
    }

    get WebSocket() {
        return `${this.wsProtocol}//${this.actualHost}`;
    }

    private protocol = location.protocol;
    private ssl = this.protocol.startsWith("https");
    private wsProtocol = this.ssl ? "wss:" : "ws:";
}
