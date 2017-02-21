import { Pipe } from '@angular/core';
import { Org } from '../model/';

@Pipe({
    name: 'userFullName'
})
export class UserFullNamePipe {
    transform(user_id: string) {
        const u = Org.CacheUsers.GetByID(user_id);
        return u ? u.fullname : 'n/a';
    }
}