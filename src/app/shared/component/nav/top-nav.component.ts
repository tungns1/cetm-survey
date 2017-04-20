import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {
    constructor(
        private router: Router
    ) {}
    @Input() role:string;

    ngOnInit() {
        console.log(this.role);
    }

    private isActive(route: string) {
        if(this.router.url.indexOf('ticketlayout') > -1 && route.indexOf('kiosk') > -1) return true;
        if(this.router.url.indexOf(route) > -1) {
            if(this.router.url.startsWith('/admin')) {
                if(this.router.url.indexOf('kiosk') > -1 && route.indexOf('kiosk') <= -1) return false;
                if(this.router.url.indexOf('screen') > - 1 && route.indexOf('screen') <= -1) return false;
                if(this.router.url.indexOf('ticketlayout') > -1 && route.indexOf('admin') > -1) return false; 
                return true;                    
            }
            else return true;
        } 
        else return false;
    }
}
