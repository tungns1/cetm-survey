import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenu, Item, GetAppName } from './model';


@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {

    constructor(private router: Router) { }

    ngOnInit() {
        this.active = this.menu.find(v => v.href === this.router.url);
    }

    onClick(item: Item) {
        this.active = item;
        if (item.app === GetAppName()) {
            this.router.navigateByUrl(item.href);
        } else {
            window.location.assign(`../${item.app}/#${item.href}`);
        }
    }

    menu = AdminMenu;
    active: Item;
}
