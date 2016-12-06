import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenu, Item, GetAppName } from './model';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {
    menu = AdminMenu;

    constructor(private router: Router) { }

    onClick(item: Item) {
        if (item.app === GetAppName()) {
            this.router.navigateByUrl(item.href);
        } else {
            window.location.assign(`../${item.app}/#${item.href}`);
        }
    }
}
