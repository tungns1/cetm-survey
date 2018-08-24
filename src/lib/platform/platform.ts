import { SmallStorage } from './storage';

interface IPlatformSerialize {
    host_cetm?: string;
    host_booking?: string;
    host_survey?: string;
}

export class PlatformEnvStorage extends SmallStorage<IPlatformSerialize> {
    constructor() {
        super("platform");
    }

    private get actualHost() {
        return this.data.host_cetm || location.host;
    }

    Update(host: string) {
        this.data.host_cetm = host;
        this.SaveData();
    }

    get Http() {
        return `${this.protocol}//${this.actualHost}`;
    }

    get WebSocket() {
        return `ws://${this.actualHost}`;
    }

    private protocol = location.protocol;
}
