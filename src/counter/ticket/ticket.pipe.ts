import { Pipe, PipeTransform } from '@angular/core';
import { Model } from '../shared/';


@Pipe({
    name: 'ticketServiceName'
})
export class TicketServiceNamePipe implements PipeTransform {
    static map = {};

    transform(ids: string | string[]) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        return ids.map(id => Model.Center.ServiceName(id));
    }
}

