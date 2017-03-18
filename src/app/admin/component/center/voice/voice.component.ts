import { Component } from '@angular/core';
import { ILayout } from '../../../service/';

import { FormBuilder, Validators } from '@angular/forms';

function NewForm(b?: ILayout) {
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
export class VoiceComponent {

    fields = [
        { title: 'LANGAUGE_NAME', name: 'name' },
        { title: 'LANGAUGE_Code', name: 'code' },
        {title: 'LANGAUGE_TYPE', name: 'type'}
    ]
}

