import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Center, House } from '../../../service/';
import { Model } from '../../../shared';

import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'house-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.css']
})
export class ScreenComponent {

    constructor(
        private center: Center.CenterService,
        private house: House.HouseService
    ) { }

    service = this.house.ScreenService;
    screens = this.house.ScreenService.RxListView
        .map(values => values.filter(v => v.inheritable));
    layouts = this.center.LayoutService.GetByType('screen');
    private focusBranchID$ = new ReplaySubject<string>(1);

    counters = this.focusBranchID$.distinctUntilChanged().switchMap(branch_id => {
        return this.house.CounterService.GetByBranch([branch_id]);
    });


    onEdit(d: Model.House.IScreen) {
        console.log(d);
        this.focusBranchID$.next(d.branch_id);
    }

    makeForm(b?: Model.House.IScreen) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, Validators.required],
            name: [b.name, Validators.required],
            counters: [b.counters, Validators.required],
            videos: [b.videos],
            news: [b.news],
            branch_id: [b.branch_id, Validators.required],
            layout_id: [b.layout_id],
            parent_id: [b.parent_id],
            inheritable: [b.inheritable]
        });
    }

}

