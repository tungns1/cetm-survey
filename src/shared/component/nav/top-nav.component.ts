import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenu, Item, GetActiveItemIndex } from './model';
import { AppState } from '../../service';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {

    constructor(
        private router: Router,
        private appService: AppState
    ) { }

    ngOnInit() {
        this.active = GetActiveItemIndex(this.appService.AppName, this.router.url);
    }

    onClick(item: Item, index: number) {
        this.active = index;
        if (item.app === this.appService.AppName) {
            this.router.navigateByUrl(item.href);
        } else {
            window.location.assign(`../${item.app}/#${item.href}`);
        }
    }

    menu = AdminMenu;
    active = -1;
}
