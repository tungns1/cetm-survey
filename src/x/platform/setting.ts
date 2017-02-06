import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class LocalSetting<T> {
    private _data: T = <any>{};
    rxMessage = new BehaviorSubject<string>('');

    constructor(private key: string) {
        this.read();
    }

    get data() {
        return this._data;
    }

    read() {
        try {
            var data = localStorage.getItem(this.key);
            var v = JSON.parse(data);
            this._data = v || {};
        } catch (e) {

        }
    }

    field(name: string) {
        return this._data[name];
    }

    save(v?: T) {
        if (v) {
            this._data = v;
        }
        var buffer = JSON.stringify(this._data);
        localStorage.setItem(this.key, buffer);
    }

    saveField(name: string, value: any) {
        this._data[name] = value;
        this.save();
    }

    autoSave(obs: Observable<any>) {
        obs.subscribe(v => this.save(v));
    }

    message(v: string) {
        this.rxMessage.next(v);
    }
}