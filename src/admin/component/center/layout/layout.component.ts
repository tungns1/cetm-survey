import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';


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

    constructor(
        private layoutApi: Center.Layout.LayoutApi,
        private route: ActivatedRoute
    ) {
        route.queryParams.forEach(v => {
            this.tag = v['tag'] || 'kiosk,screen';
            this.data = this.layoutApi.AutoRefresh(this.tag);
        })
    }

    tag: string;

    service: Editor.IEditService<Model.Center.ILayout> = {
        api: this.layoutApi,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = this.layoutApi.AutoRefresh('kiosk,screen');

    fields = [
        { title: 'LABEL_NAME', name: 'name' },
        { title: 'LABEL_TYPE', name: 'type' }
    ]
}

