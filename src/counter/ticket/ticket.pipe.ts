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


function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "ticketHour"
})
export class TicketHourPipe implements PipeTransform {
    transform(v: number) {
        var d = new Date(v * 1000);
        return [d.getHours(), d.getMinutes(), d.getSeconds()].map(TwoDigit).join(":");
    }
}

@Pipe({
    name: 'ticketDuration'
})
export class TicketDurationPipe implements PipeTransform {
    transform(v: number) {
        console.log(Date.now());
        let duration = Date.now() / 1000 - v;
        return [duration / 3600, (duration % 3600) / 60, (duration % 60)].map(TwoDigit).join(":");
    }
}