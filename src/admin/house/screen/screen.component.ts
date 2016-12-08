import { Component, ViewChild } from '@angular/core';
import { Center, House, Service, User } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';

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

    service: Editor.IEditService<Model.House.IScreen> = {
        api: House.Screen.Api,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = House.Screen.AutoRefresh();
    screens = this.data.map(values => values.filter(v => v.inheritable));
    layouts = Center.Layout.GetByType('screen');
    counters: Model.House.ICounter[] = [];

    onEdit(form: FormGroup) {
        this.onBranchChange(form.value.branch_id);
    }

    onBranchChange(branch_id: string) {
        House.Counter.GetByBranch(branch_id).subscribe(v => this.counters = v);
    }

    fields = [
        { title: 'Phòng giao dịch', name: 'branch' },
        { title: 'Tên', name: 'name' }
    ]
}

