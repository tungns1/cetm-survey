
export interface IServiceConfig {
    max_serving_minute?: string;
    max_waitng_minute?: string;
    auto_finish_minute?: string;
    wait_long_alert_percent?: number;
    serve_long_alert_percent?: number;
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

    get wait_long_alert_percent() {
        return +this._c.wait_long_alert_percent || 40;
    }
    get serve_long_alert_percent() {
        return +this._c.serve_long_alert_percent || 10;
    }

    __update(c: IServiceConfig) {
        if (!c) return;
        this._c = c;
    }
}