import { Component } from '@angular/core';
import { Center } from '../../../service/';
import { Branch, Model } from '../../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'center-tform',
    templateUrl: 'tform.component.html',
    styleUrls: ['tform.component.css']
})
export class TFormComponent {
    constructor(
        private center: Center.CenterService
    ) { }

    service = this.center.TFormService;

    makeForm(b?: Model.Center.ITForm) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            code: [b.code, Validators.required],
            format: [b.format, Validators.required],
            minnum: [b.minnum || 0, Validators.required],
            maxnum: [b.maxnum || 999, Validators.required],
            template: [b.template]
        });
    }
}

