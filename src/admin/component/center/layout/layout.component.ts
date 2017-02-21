import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../../../service/';
import { Branch, Model } from '../../../shared/';

@Component({
    selector: 'center-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent {

    constructor(
        private center: Center.CenterService,
        private route: ActivatedRoute
    ) {
        route.queryParams.forEach(v => {
            this.tag = v['tag'] || 'kiosk,screen';
        })
    }

    tag: string;

    makeForm(b?: Model.Center.ILayout) {
        b = b || <any>{};
        return (new FormBuilder).group({
            id: [b.id],
            name: [b.name, Validators.required],
            type: [b.type, Validators.required],
            ui: [b.ui || {}],
            style: [b.style],
        });
    }

    service = this.center.LayoutService;
}

