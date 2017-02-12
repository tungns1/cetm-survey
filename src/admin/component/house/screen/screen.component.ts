import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Center, House } from '../../../service/';
import { Model } from '../../../shared';

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
    counters: Model.House.ICounter[] = [];

    onEdit(form: FormGroup) {
        this.onBranchChange(form.value.branch_id);
    }

    onBranchChange(branch_id: string) {
        this.house.CounterService.GetByBranch(branch_id.split(','))
            .subscribe(v => this.counters = v);
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

