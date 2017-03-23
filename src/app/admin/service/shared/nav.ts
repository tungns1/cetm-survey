
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AdminNavService {
    get Refresh$() {
        return this._refresh$.asObservable();
    }

    private _refresh$ = new ReplaySubject<any>(1);
    Refresh() {
        this._refresh$.next(null);
    }
}