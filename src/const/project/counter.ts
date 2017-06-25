
export type OverrideMode = 'alway_on' | 'alway_off' | 'inherit';

export interface ICounterConfig {
    record_transaction?: OverrideMode;
}

export class CounterConfig {
    constructor(private _c: ICounterConfig = {}) { }
    get record_transaction(): OverrideMode {
        return this._c.record_transaction || 'alway_off';
    }

    IsOn(args: OverrideMode[]) {
        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case "alway_on":
                    return true;
                case "alway_off":
                    return false;
            }
        }
        return false;
    }

    __update(c: ICounterConfig) {
        if (!c) return;
        this._c = c;
    }

}