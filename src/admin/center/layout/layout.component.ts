import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';


function NewForm(b?: Model.Center.ILayout) {
    b = b || <any>{};
    return (new FormBuilder).group({
        id: [b.id],
        name: [b.name, Validators.required],
        type: [b.type, Validators.required],
        ui: [b.ui || {}],
        style: [b.style],
    });
}

@Component({
    selector: 'center-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent {

    constructor(private route: ActivatedRoute) {
        route.queryParams.forEach(v => {
            this.tag = v['tag'] || 'kiosk,screen';
            this.data = Center.Layout.AutoRefresh(this.tag);
        })
    }

    tag: string;

    service: Editor.IEditService<Model.Center.ILayout> = {
        api: Center.Layout.Api,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = Center.Layout.AutoRefresh('kiosk,screen');

    fields = [
        { title: 'Tên', name: 'name' },
        { title: 'Code', name: 'code' },
        { title: 'Loại', name: 'type' }
    ]
}

