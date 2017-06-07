import { IUser, USER_ROLES } from '../../shared';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class UserGroup {
    constructor(
        private data: IUser[] = []
    ) { }

    private filterByRole(role: string) {
        return (this.data || []).filter(d => d && d.role && d.role.indexOf(role) !== -1);
    }

    admin = this.filterByRole(USER_ROLES.ADMIN);
    manager = this.filterByRole(USER_ROLES.MANAGER);


}