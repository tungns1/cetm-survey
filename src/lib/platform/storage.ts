import { Injectable, InjectionToken } from '@angular/core';
import { ReplaySubject ,  Observable } from 'rxjs';




@Injectable()
export abstract class AbstractStorageStrategy {
    abstract saveRaw(key: string, value: string);
    abstract readRaw(key: string): string;
}

export abstract class AbstractSerializable<T> {
    constructor(protected data: T) {
        this.data = data || <T>{};
    }

    get value() {
        return this.data;
    }
}

@Injectable()
export abstract class AbstractSerializeStrategy<T> {
    public abstract serialize(data: T): string;
    public abstract deserialize(str: string): T;
}

class JsonSerializeStrategy<T> extends AbstractSerializeStrategy<T> {
    public serialize(data: T) {
        return JSON.stringify(data);
    }

    public deserialize(str: string): T {
        const data: T = JSON.parse(str);
        return data;
    }
}


@Injectable()
export class LocalStorageStrategy extends AbstractStorageStrategy {
    readRaw(key: string) {
        return localStorage.getItem(key);
    }

    saveRaw(key: string, value: string) {
        return localStorage.setItem(key, value);
    }
}

export function SetStoragePrefix(prefix: string) {
    _prefix = prefix;
}

let _prefix = '';

function getKey(key: string) {
    return `${_prefix}_${key}`;
}


const handler = {
    get: function (target, name) {
        return target[name];
    },
    set: function (obj, prop, value) {
        console.log("set ---", prop, value.length);
        obj[prop] = value;
        return true;
    },
    deleteProperty: function (oTarget, sKey) {
        console.error(sKey);
        return true;
    },
};

import { cloneDeep } from 'lodash';

@Injectable()
export class SmallStorage<T> {
    constructor(
        protected key: string,
        private io?: AbstractStorageStrategy,
        private serializer?: AbstractSerializeStrategy<T>
    ) {
        this.key = getKey(key);
        this.io = this.io || new LocalStorageStrategy;
        this.serializer = this.serializer || new JsonSerializeStrategy<T>();
        this._onInit();
    }

    protected data: T;
    Data$ = new ReplaySubject<T>(1);

    get Data() {
        return cloneDeep(this.data);
    }

    protected SaveData(emitEvent = false) {
        this.save(this.data);
        if (emitEvent) {
            this.EmitEvent();
        }
    }

    protected EmitEvent() {
        this.Data$.next(this.data);
    }

    private _onInit() {
        let data = this.read();
        this.data = data;
        this.EmitEvent();
    }

    protected serialize(data: T) {
        return this.serializer.serialize(data);
    }

    protected deserialize(str: string): T {
        let data: T;
        try {
            if (!str) {
                return <T>{};
            }
            data = this.serializer.deserialize(str);
        } catch (e) {
            console.log(`parse ${this.key} from ${str} failed`);
        } finally {
            return data || <T>{};
        }
    }

    private read() {
        const str = this.io.readRaw(this.key);
        return this.deserialize(str);
    }

    private save(data: T) {
        const value = this.serializer.serialize(data);
        this.io.saveRaw(this.key, value);
    }

}