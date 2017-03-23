
import { Injectable } from '@angular/core';
import { ExclusiveEventEmitter } from '../../shared';

@Injectable()
export class MonitorNavService {
    Refresh$ = new ExclusiveEventEmitter();
}