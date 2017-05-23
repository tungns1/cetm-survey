import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ExclusiveEventEmitter } from '../shared';

@Injectable()
export class ReportNavService {
    Refresh$ = new ExclusiveEventEmitter();
}