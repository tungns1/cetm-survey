import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, InjectionToken } from '@angular/core';
import 'rxjs/add/operator/skip';

@Injectable()
export abstract class AbstractStorageStrategy {
    abstract saveRaw(key: string, value: string);
    abstract readRaw(key: string): string;
}

@Injectable()
export class SmallStorage<T> {
    constructor(protected key: string, private io: AbstractStorageStrategy) {
        this.onInit();
    }

    Data$: BehaviorSubject<T>;

    get value() {
        return this.Data$.value;
    }

    protected onInit() {
        this.Data$ = new BehaviorSubject<T>(this.read());
        this.Data$.skip(1).subscribe(data => {
            this.save(data);
        });
    }

    protected serialize(data: T) {
        return JSON.stringify(data);
    }

    protected deserialize(str: string): T {
        let data: T;
        try {
            if (!str) {
                return <any>{};
            }
            data = JSON.parse(str);
        } catch (e) {
            console.log(`parse ${this.key} from ${str} failed`);
        } finally {
            return data || <any>{};
        }
    }

    private read() {
        const str = this.io.readRaw(this.key);
        const data: T = this.deserialize(str);
        return data;
    }

    private save(data: T) {
        const value = this.serialize(data);
        this.io.saveRaw(this.key, value);
    }

}