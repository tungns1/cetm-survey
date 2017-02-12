export * from './branch';
export * from './user';
import { UserService } from './user';


import { Injectable } from '@angular/core';
import { FilterService } from '../shared';

@Injectable()
export class OrgService {
    constructor(
        protected filterService: FilterService
    ) {
        this.onInit();
    }

    private onInit() {
        this.UserService = new UserService(this.Link.User, this.filterService);
    }

    UserService: UserService;
    Link = {
        User: '/api/admin/org/user'
    }
}

export const orgServiceProvider = [
    OrgService
]