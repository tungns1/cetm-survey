
import { Injectable } from '@angular/core';
import { Subject ,  ReplaySubject } from 'rxjs';
import { ExclusiveEventEmitter } from '../../shared';

@Injectable()
export class AdminNavService {
    get Refresh$() {
        return this._refresh$.asObservable();
    }

    private _refresh$ = new ExclusiveEventEmitter();
    Refresh() {
        this._refresh$.next(null);
    }
}