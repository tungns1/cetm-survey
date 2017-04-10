import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: '[groupByTitle]',
    template: `
        <ng-container [ngSwitch]="code">
            <span *ngSwitchCase="'service_id'" i18n>Service</span>
            <span *ngSwitchCase="'user_id'" i18n>Teller</span>
            <span *ngSwitchCase="'counter_id'" i18n>Counter</span>
            <span *ngSwitchCase="'branch_id'" i18n>Store</span>
        </ng-container>
    `
})
export class GroupByTitleComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    @Input('groupByTitle') code: string;

}