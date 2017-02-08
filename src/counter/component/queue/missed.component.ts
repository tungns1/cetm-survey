import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Missed } from '../../service/queue';
import { Model } from '../../shared/';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const search = new BehaviorSubject<string>('');

import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    selector: 'missed',
    templateUrl: 'missed.component.html',
    styleUrls: ['waiting.component.css']
})
export class MissedComponent {
    count = Missed.count();
    tickets = combineLatest<Model.House.ITicket[], string>(Missed.RxData, search).map(([tickets, text]) => {
        return tickets.filter(v => v.cnum.indexOf(text) !== -1);
    })

    onSearch(ticket:string) {
        search.next(ticket);
    }
}