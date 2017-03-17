export * from './branch';
export * from './user';

import { UserService } from './user';

import { BranchService } from './branch';

import { Injectable } from '@angular/core';
import { AdminFilterService } from '../shared';
import { AuthService } from '../../shared';

@Injectable()
export class OrgService {
    constructor(
        protected filterService: AdminFilterService,
        private authService: AuthService
    ) {
        this.onInit();
    }

    private onInit() {
        this.BranchService = new BranchService(this.Link.Branch, this.filterService, this.authService);
        this.UserService = new UserService(this.Link.User, this.filterService);
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