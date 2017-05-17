import { Pipe } from '@angular/core';
import { CacheUsers } from '../model/';

@Pipe({
    name: 'userFullName'
})
export class UserFullNamePipe {
    transform(user_id: string) {
        const u = CacheUsers.GetByID(user_id);
        return u ? u.fullname : 'n/a';
    }
}
@Pipe({
    name: 'userCode'
})
export class UserCodePipe {
    transform(user_id: string) {
        console.log(user_id)
        const u = CacheUsers.GetByID(user_id);
        console.log(u);
        return u ? u.username : 'n/a';
    }
}