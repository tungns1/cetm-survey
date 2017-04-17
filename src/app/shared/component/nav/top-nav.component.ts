import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {
    constructor(
        private Route: ActivatedRoute,
        private Rou: Router
    ) {
        
    }

    ngOnInit() {
        this.Route.url.subscribe(url => {
            console.log(url)
        })
    }


    private IsActive() {
        this.url = this.router.url;
        console.log(this.url);
        return this.url;
    }
    url: string;
    router: Router;
}
