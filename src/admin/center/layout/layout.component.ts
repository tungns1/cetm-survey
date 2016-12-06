import { Component } from '@angular/core';
import { Center } from '../../backend/';
import { Branch, Editor, Model } from '../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

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
    templateUrl: 'layout.component.html'
})
export class LayoutComponent {

    service: Editor.IEditService<Model.Center.ILayout> = {
        api: Center.Layout.Api,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = Center.Layout.AutoRefresh();
    
    fields = [
        { title: 'Tên', name: 'name' },
        { title: 'Code', name: 'code' },
        {title: 'Loại', name: 'type'}
    ]
}

