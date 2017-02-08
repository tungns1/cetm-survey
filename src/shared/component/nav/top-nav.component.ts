import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenu, Item, GetAppName, GetActiveItemIndex } from './model';


@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {

    constructor(private router: Router) { }

    ngOnInit() {
        this.active = GetActiveItemIndex(this.router.url);
    }

    onClick(item: Item, index: number) {
        this.active = index;
        if (item.app === GetAppName()) {
            this.router.navigateByUrl(item.href);
        } else {
            window.location.assign(`../${item.app}/#${item.href}`);
        }
    }

    menu = AdminMenu;
    active = -1;
}
