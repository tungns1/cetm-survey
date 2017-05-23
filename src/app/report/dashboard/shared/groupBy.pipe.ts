import { Pipe, PipeTransform } from '@angular/core';
import {
    ServiceName, CacheBranch, CacheCounter, CacheUsers
} from '../../shared';
import { IAggregate } from './aggregate';

@Pipe({
    name: 'groupByTitle'
})
export class GroupByTitlePipe implements PipeTransform {

    transform(groupBy: string, record: IAggregate) {
        const id = record[groupBy];
        // console.log(record);
        switch (groupBy) {
            case 'service_id':
                return ServiceName(id);
            case 'branch_id':
                return CacheBranch.GetNameForID(id);
            case 'user_id':
                return CacheUsers.GetName(id, 'fullname');
            case 'counter_id':
                return CacheCounter.GetName(id, 'name');
        }
        return CacheCounter.NotApplicable;
    }

}