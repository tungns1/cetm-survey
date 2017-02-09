
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class NavigationService {
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}
    
}