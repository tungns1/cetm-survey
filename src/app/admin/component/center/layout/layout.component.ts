import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CenterService, ILayout } from '../../../service/';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'center-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent {

    constructor(
        private center: CenterService,
        private route: ActivatedRoute
    ) {
        route.queryParams.forEach(v => {
            this.tag = v['tag'] || 'kiosk,screen';
        })
    }

    tag: string;

    makeForm(b?: ILayout) {
        b = b || <any>{};
        b.ui = b.ui || <any>{};
        const resources = Object.assign(cloneDeep(b.ui.resources), b.resources);
        return (new FormBuilder).group({
            id: [b.id],
            name: [b.name, Validators.required],
            type: [b.type, Validators.required],
            ui: [b.ui || {}],
            style: [b.style],
            resources: [resources]
        });
    }

    service = this.center.LayoutService;
}

