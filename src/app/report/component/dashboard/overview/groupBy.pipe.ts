import { Pipe, PipeTransform } from '@angular/core';

const GroupByTitles = {
    service_id: "LANGAUGE_SERVICE",
    branch_id: "LANGAUGE_SUB_BRANCH",
    counter_id: "LANGAUGE_COUNTER",
    user_id: "LANGAUGE_STAFF"
}


@Pipe({
    name: 'groupByTitle'
})
export class GroupByTitlePipe implements PipeTransform {

    transform(value: string) {
        return GroupByTitles[value];
    }

}