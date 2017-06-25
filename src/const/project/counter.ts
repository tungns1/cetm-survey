
type OverrideMode = 'alway_on' | 'alway_off' | 'inherit';

export interface ICounterConfig {
    record_transaction?: OverrideMode;
}

export class CounterConfig {
    constructor(private _c: ICounterConfig = {}) { }
    get record_transaction(): OverrideMode {
        return this._c.record_transaction || 'alway_off';
    }

    __update(c: ICounterConfig) {
        if (!c) return;
        this._c = c;
    }
}