import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopNavMenu, Item, GetActiveItemIndex } from './model';
import { AppState } from '../../service';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appService: AppState
    ) { }

    ngOnInit() {
        this.active = GetActiveItemIndex(this.appService.AppName, this.router.url);
    }

    onClick(item: Item, index: number) {
        this.active = index;
        const queryParams = this.route.root.snapshot.queryParams;
        if (item.app === this.appService.AppName) {
            this.router.navigate([item.href], {
                queryParams: queryParams
            });
        } else {
            const query = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
            console.log(query);
            window.location.assign(`../${item.app}/#${item.href}?${query}`);
        }
    }

    menu = TopNavMenu;
    active = -1;
}
