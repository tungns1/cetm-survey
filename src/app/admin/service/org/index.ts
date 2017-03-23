export * from './branch';
export * from './user';

import { UserService } from './user';

import { BranchService } from './branch';

import { Injectable } from '@angular/core';
import { BranchFilterService, AdminNavService } from '../shared';
import { AuthService, HttpServiceGenerator } from '../../shared';

@Injectable()
export class OrgService {
    constructor(
        protected filterService: BranchFilterService,
        private nav: AdminNavService,
        private authService: AuthService,
        private httpSG: HttpServiceGenerator
    ) {
        this.onInit();
    }

    private onInit() {
        this.BranchService = new BranchService(
            this.nav,
            this.httpSG.make(this.Link.Branch),
            this.filterService,
            this.authService
        );

        this.UserService = new UserService(
            this.nav,
            this.httpSG.make(this.Link.User),
            this.filterService
        );
    }

    BranchService: BranchService;
    UserService: UserService;

    Link = {
        Branch: '/api/admin/org/branch',
        User: '/api/admin/org/user'
    }
}

export const orgServiceProvider = [
    OrgService
]