import { Component, ViewChild } from '@angular/core';
import { Center, House, User } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

function NewForm(b?: Model.House.IScreen) {
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

@Component({
    selector: 'house-screen',
    templateUrl: 'screen.component.html',
    styleUrls: ['screen.component.css']
})
export class ScreenComponent {

    constructor(
        private layoutApi: Center.Layout.LayoutApi,
        private counterApi: House.Counter.CounterApi,
        private screenApi: House.Screen.ScreenApi
    ) { }

    service: Editor.IEditService<Model.House.IScreen> = {
        api: this.screenApi,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = this.screenApi.AutoRefresh();
    screens = this.data.map(values => values.filter(v => v.inheritable));
    layouts = this.layoutApi.GetByType('screen');
    counters: Model.House.ICounter[] = [];

    onEdit(form: FormGroup) {
        this.onBranchChange(form.value.branch_id);
    }

    onBranchChange(branch_id: string) {
        this.counterApi.GetByBranch(branch_id).subscribe(v => this.counters = v);
    }

    fields = [
        { title: 'LABEL_SUB_BRANCH', name: 'branch' },
        { title: 'LABEL_NAME', name: 'name' }
    ]
}

