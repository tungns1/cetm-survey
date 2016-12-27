
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
                ticketState = 'Chờ';
                break;
            case 'serving':
                ticketState = 'Phục vụ';
                break;
            case 'missed':
                ticketState = 'Đặt nhỡ';
                break;
            case 'cancelled':
                ticketState = 'Bị xóa';
                break;
            case 'finished':
                ticketState = 'Kết thúc';
                break;
            default:
               ticketState = 'Không biết';
        }
        return ticketState;
    }
}



