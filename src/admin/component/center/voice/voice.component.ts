import { Component } from '@angular/core';
import { Center } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

function NewForm(b?: Model.Center.ILayout) {
    b = b || <any>{};
    return (new FormBuilder).group({
        id: [b.id],
        name: [b.name, Validators.required],
        type: [b.type, Validators.required],
        // main: [b.main || {}]
    });
}

@Component({
    selector: 'center-voice',
    templateUrl: 'voice.component.html'
})
export class LayoutComponent {

    service: Editor.IEditService<Model.Center.ILayout> = {
        api: Center.Layout.Api,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = Center.Layout.AutoRefresh('');
    
    fields = [
        { title: 'LABEL_NAME', name: 'name' },
        { title: 'Code', name: 'code' },
        {title: 'LABEL_TYPE', name: 'type'}
    ]
}

