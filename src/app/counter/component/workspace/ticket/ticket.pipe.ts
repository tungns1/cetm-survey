import { Pipe, PipeTransform } from '@angular/core';
import { ServiceName } from '../../shared/';

@Pipe({
    name: 'ticketServiceName'
})
export class TicketServiceNamePipe implements PipeTransform {
    transform(ids: string | string[]) {
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        return ids.map(id => ServiceName(id));
    }
}

