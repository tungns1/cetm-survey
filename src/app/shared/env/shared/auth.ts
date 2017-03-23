import {
    AbstractSerializable, AbstractStorageStrategy, SmallStorage
} from '../../shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface IAuthEnv {
    branch: string;
    store: string;
    module: string;
    sub_module: string;
    user_id: string;
    role: string;
}

export class AuthEnvStorage {
    Data$ = new BehaviorSubject<IAuthEnv>(<any>{});

    get data() {
        return this.Data$.value;
    }

    emitChange() {
        this.Data$.next(this.data);
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