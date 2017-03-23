import {
    AbstractSerializable, AbstractStorageStrategy, SmallStorage
} from '../../shared';

interface IAuthEnv {
    branch: string;
    store: string;
    module: string;
    sub_module: string;
    user_id: string;
    role: string;
}

export class AuthEnvStorage extends SmallStorage<IAuthEnv> {
    constructor() {
        super("auth");
    }

    set Module(m: string) {
        this.data.module = m;
        this.emitChange();
    }

    set SubModule(m: string) {
        this.data.sub_module = m;
        this.emitChange();
    }
}