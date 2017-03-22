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
        return this.data.host || location.host;
    }

    get Http() {
        return `${this.protocol}//${this.actualHost}`;
    }

    get WebSocket() {
        return `ws://${this.actualHost}`;
    }

    private protocol = location.protocol;
}
