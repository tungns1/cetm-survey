import { Component } from '@angular/core';
import { Center } from '../../../service/';
import { Branch, Editor, Model } from '../../../shared/';

import { FormBuilder, Validators } from '@angular/forms';

function NewForm(b?: Model.Center.ITForm) {
    b = b || <any>{};
    return (new FormBuilder).group({
        id: [b.id],
        code: [b.code, Validators.required],
        format: [b.format, Validators.required],
        minnum: [b.minnum || 0, Validators.required],
        maxnum: [b.maxnum || 999, Validators.required]
    });
}

@Component({
    selector: 'center-tform',
    templateUrl: 'tform.component.html',
    styleUrls: ['tform.component.css']
})
export class TFormComponent {
    constructor(
        private tformApi: Center.TForm.TFormApi
    ) { }

    service: Editor.IEditService<Model.Center.ITForm> = {
        api: this.tformApi,
        form: NewForm,
        refresh: () => this.data.refresh()
    };

    data = this.tformApi.AutoRefresh();

    fields = [
        { title: 'Code', name: 'code' }
    ]
}

