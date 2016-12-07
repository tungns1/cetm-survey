import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RxCounters, RxServices, RxUsers } from './filter.service';
import { Model } from '../shared/';

@Component({
    selector: 'counter-selector',
    template: `
     <input type="checkbox" (change)="checkAll(changes=!changes)" > &nbsp;Chọn tất cả<br>
        <span *ngFor="let v of (counters | async)">
            <input type="checkbox" [(ngModel)]="v._checked">&nbsp;{{v.name}}
            <br>
        </span>
    `
})
export class CounterSelectorComponent {
    counters = RxCounters;
    checkAll(event) {
        let selects: Model.ICounter[] = [];
        RxCounters.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        RxCounters.next(selects);
    }
}

@Component({
    selector: 'user-selector',
    template: `
        
        <input type="checkbox" (change)="checkAll(changes=!changes)" > &nbsp;Chọn tất cả<br>
        <span *ngFor="let v of (users | async)">
            <input type="checkbox" [(ngModel)]="v._checked">&nbsp;{{v.fullname}}
            <br>
        </span>
       
    `
})
export class UserSelectorComponent {
    users = RxUsers;

    checkAll(event) {
        let selects: Model.IUser[] = [];
        RxUsers.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        RxUsers.next(selects);
    }
}

@Component({
    selector: 'service-selector',
    template: `
     <input type="checkbox" (change)="checkAll(changes=!changes)" >&nbsp;Chọn tất cả<br>
        <span *ngFor="let v of (services | async)">
            <input type="checkbox" [(ngModel)]="v._checked">&nbsp;{{v.name}}
            <br>
        </span>
    `
})
export class ServiceSelectorComponent {
    services = RxServices;
    checkAll(event) {
        let selects: Model.Center.IService[] = [];
        RxServices.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        RxServices.next(selects);
    }

}

import { Pipe, PipeTransform } from '@angular/core';
import { NameMap } from './filter.service';

@Pipe({
    name: 'reportName'
})
export class ReportNamePipe implements PipeTransform {
    transform(id: string) {
        return NameMap[id] || 'n/a';
    }
}
