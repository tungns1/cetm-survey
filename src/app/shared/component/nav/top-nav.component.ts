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
            this.router.navigate([item.href], {
                queryParams: queryParams
            });
    }

    menu = TopNavMenu;
    active = -1;
}
