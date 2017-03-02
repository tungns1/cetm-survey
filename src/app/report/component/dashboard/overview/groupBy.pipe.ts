import { Pipe, PipeTransform } from '@angular/core';

const GroupByTitles = {
    service_id: "SERVICE",
    branch_id: "SUB_BRANCH",
    counter_id: "COUNTER",
    user_id: "STAFF"
}


@Pipe({
    name: 'groupByTitle'
})
export class GroupByTitlePipe implements PipeTransform {

    transform(value: string) {
        return GroupByTitles[value];
    }

}