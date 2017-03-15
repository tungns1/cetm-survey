import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueueService } from '../service';
import { Model } from '../../shared/';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const search = new BehaviorSubject<string>('');

import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    selector: 'missed',
    templateUrl: 'missed.component.html',
    styleUrls: ['queue.component.scss']
})
export class MissedComponent {
    constructor(
        private queueService: QueueService
    ) { }

    missed$ = this.queueService.missed$;

    count = this.missed$.map(data => data.length);
    tickets = combineLatest<Model.House.ITicket[], string>(this.missed$, search).map(([tickets, text]) => {
        return tickets.filter(v => v.cnum.indexOf(text) !== -1);
    });
    
    onSearch(ticket: string) {
        search.next(ticket);
    }
}