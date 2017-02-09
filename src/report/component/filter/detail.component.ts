import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FocusBranchService } from '../../service';
import { Model } from '../../shared/';

@Component({
    selector: 'counter-selector',
    template: `
     <input type="checkbox" (change)="checkAll(changes=!changes)" >&nbsp;Chọn tất cả<br>
        <span *ngFor="let v of (counters | async)">
            <input type="checkbox" [(ngModel)]="v._checked">&nbsp;{{v.name}}
            <br>
        </span>
    `
})
export class CounterSelectorComponent {

    constructor(
        private filterService: FocusBranchService
    ) { }

    counters = this.filterService.RxCounters;
    checkAll(event) {
        let selects: Model.House.ICounter[] = [];
        this.filterService.RxCounters.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        this.filterService.RxCounters.next(selects);
    }
}

@Component({
    selector: 'user-selector',
    template: `
        
        <input type="checkbox" (change)="checkAll(changes=!changes)" >&nbsp;Chọn tất cả<br>
        <span *ngFor="let v of (users | async)">
            <input type="checkbox" [(ngModel)]="v._checked">&nbsp;{{v.fullname}}
            <br>
        </span>
       
    `
})
export class UserSelectorComponent {
    constructor(
        private filterService: FocusBranchService
    ) { }

    users = this.filterService.RxUsers;

    checkAll(event) {
        let selects: Model.IUser[] = [];
        this.filterService.RxUsers.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        this.filterService.RxUsers.next(selects);
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
    constructor(
        private filterService: FocusBranchService
    ) { }

    services = this.filterService.RxServices;
    checkAll(event) {
        let selects: Model.Center.IService[] = [];
        this.services.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        this.services.next(selects);
    }

}
