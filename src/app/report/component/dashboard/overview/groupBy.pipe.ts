import { Pipe, PipeTransform } from '@angular/core';

const GroupByTitles = {
    service_id: "Service",
    branch_id: "Choose Agency",
    counter_id: "Counter",
    user_id: "Teller"
}


@Pipe({
    name: 'groupByTitle'
})
export class GroupByTitlePipe implements PipeTransform {

    transform(value: string) {
        return GroupByTitles[value];
    }

}