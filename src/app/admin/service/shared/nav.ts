
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AdminNavService {
    Refresh$ = new Subject();
}