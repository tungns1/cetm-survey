import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Missed } from '../backend/queue';


import { Model } from '../shared/';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const search = new BehaviorSubject<string>('');

import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    selector: 'missed',
    templateUrl: 'missed.component.html',
    styleUrls: ['waiting.component.css']
})
export class MissedComponent {
    private tk: string;
    show=true;
    count = Missed.count();
    tickets = combineLatest<Model.House.ITicket[], string>(Missed.RxData, search).map(([tickets, text]) => {
        return tickets.filter(v => v.cnum.indexOf(text) !== -1);
    })

    onSearch(e: Event) {
        if (!e) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        search.next(e.target['value']);
    }
    showInput(ticket:string){
        this.show=!this.show;
        this.tk='';
    }
}