import { IGeneralConfig, GeneralConfig } from './general';
import { IServiceConfig, ServiceConfig } from './service';
import { IPriorityConfig, PriorityConfig } from './priority';
import { ICounterConfig, CounterConfig } from './counter';

interface IGlobalConfig {
    general?: IGeneralConfig;
    priority?: IPriorityConfig;
    service?: IServiceConfig;
    counter?: ICounterConfig;
}

export class GlobalConfig {
    constructor(private _c: IGlobalConfig = {}) { };
    general = new GeneralConfig(this._c.general);
    priority = new PriorityConfig(this._c.priority);
    service = new ServiceConfig(this._c.service);
    counter = new CounterConfig(this._c.counter);

    __update(c: IGlobalConfig = {}) {
        this.general.__update(c.general);
        this.service.__update(c.service);
        this.priority.__update(c.priority);
        this.counter.__update(c.counter);
    }
}