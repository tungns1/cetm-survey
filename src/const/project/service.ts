
export interface IServiceConfig {
    max_serving_minute?: string;
    max_waitng_minute?: string;
    auto_finish_minute?: string;
}

export class ServiceConfig {
    constructor(private _c: IServiceConfig = {}) { }
    get max_serving_minute() {
        return +this._c.max_serving_minute || 15;
    }
    get max_waiting_minute() {
        return +this._c.max_waitng_minute || 15;
    }
    get auto_finish_minute() {
        return +this._c.auto_finish_minute || 120;
    }

    __update(c: IServiceConfig) {
        if (!c) return;
        this._c = c;
    }
}