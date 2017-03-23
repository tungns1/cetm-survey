import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LayoutService, CounterService, ScreenService, IScreen } from '../../../service/';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'house-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.css']
})
export class ScreenComponent {

    constructor(
        private layoutService: LayoutService,
        private counterService: CounterService,
        private service: ScreenService
    ) { }

    screens = this.service.RxListView
        .map(values => values.filter(v => v.inheritable));
    layouts = this.layoutService.GetByType('screen');
    private focusBranchID$ = new ReplaySubject<string>(1);

    counters = this.focusBranchID$.distinctUntilChanged().switchMap(branch_id => {
        return this.counterService.GetByBranch([branch_id]);
    });


    onEdit(d: IScreen) {
        console.log(d);
        this.focusBranchID$.next(d.branch_id);
    }

    makeForm(b?: IScreen) {
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

