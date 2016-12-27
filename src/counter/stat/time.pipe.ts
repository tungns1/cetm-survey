
import { Pipe, PipeTransform } from '@angular/core';

function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "hour"
})
export class HourPipe implements PipeTransform {
    timeStamp = Math.floor(Date.now() / 1000);
    transform(v: number) {
        return [v / 3600, (v % 3600) / 60, v % 60].map(TwoDigit).join(":");
    }
}


@Pipe({
    name: "state"
})

export class StateTicketPipe implements PipeTransform {

    transform(state: string) {
        let ticketState = '';
        switch (state) {
            case 'waiting':
                ticketState = 'chờ';
                break;
            case 'serving':
                ticketState = 'phục vụ';
                break;
            case 'missed':
                ticketState = 'đặt nhỡ';
                break;
            case 'cancelled':
                ticketState = 'bị xóa';
                break;
            case 'finished':
                ticketState = 'kết thúc';
                break;
            default:
               ticketState = 'không biết';
        }
    }
}



