import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum } from "lodash";
import { CacheBranch } from '../../shared/model';
export interface IKioskTrack {
    id?: string
    bid: string;
    eid: string;
    cat: string;
    data: IKioskTrackData;
    state: string;
    s_at: number;
    e_at: number;
    a_d: number;
    date: string;

}

export interface IKioskTrackData {
    pc: number;
    ps: string;
    ps_a: number;
}



export interface ITime {
    name: string;
    value: number;
}
export interface ITicket {
    name: string;
    value: number;
}
export interface ITimeDay {
    name: string;
    value: number;
}
export interface ITicketDay {
    name: string;
    value: number;
}
export interface ITimeSum {
    name: string;
    total: number;
    longest: number;
    shortest: number;
    average: number;
}
export interface ITicketSum {
    name: string;
    total: number;
    highest: number;
    lowest: number;
    average: number;
}



export class InfoKioskTrack {

    data: IKioskTrack[] = [];
    ticket: ITicket[] = [];
    time: ITime[] = [];
    ticket_day: ITicketDay[] = [];
    time_day: ITimeDay[] = [];
    ticket_sum: ITicketSum[] = [];
    time_sum: ITimeSum[] = [];
    total_kiosk = 0;
    longest_activity_kiosk = '';
    shortest_activity_kiosk = '';
    // average_kiosk_eff = 0;
    total_activity_time = 0;
    longest_activity_time = 0;
    shortest_activity_time = 0;
    average_activity_time = 0;
    total_ticket = 0;
    highest_ticket_from = '';
    lowest_ticket_from = '';
    average_printed_ticket = 0;
    highest_ticket_quantity = 0;
    lowest_ticket_quantity = 0;
    timechart = [
        {
            "name": "Active Time",
            "series": [
            ]
        }
    ];
    ticketchart = [
        {
            "name": "Ticket Quantity",
            "series": [
            ]
        }
    ];





    Add(s: IKioskTrack[]) {

        if (s.length > 0) {
            this.total_activity_time = this.SecondToHour(sumBy(s, 'a_d'))
            this.total_kiosk = size(groupBy(s, 'device_id'));
            s.forEach(v => {
                if (v.data != null) {
                    this.total_ticket += v.data.pc || 0;
                }

            })
            var data_by_branh = toArray(groupBy(s, 'bid'));


            var data_by_date = toArray(groupBy(s, 'date'));
            var len_by_date = size(data_by_date);
            var len_by_branch = size(data_by_branh);


            for (var i = 0; i < len_by_branch; i++) {
                var min = 0, max = 0, total = 0;
                data_by_branh[i].forEach(v => {
                    if (v.data != null) {
                        if (v.data.pc < min) {
                            min = +v.data.pc || 0;
                        }
                        if (v.data.pc > max) {
                            max = +v.data.pc || 0;
                        }
                        total += +v.data.pc || 0;
                    }
                })

                this.ticket.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].bid),
                    value: total
                })
                this.time.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].bid),
                    value: this.SecondToHour(sumBy(data_by_branh[i], 'a_d'))
                })
                this.ticket_sum.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].bid),
                    total: total,
                    highest: max,
                    lowest: min,
                    average: +(total / (data_by_branh[i].length)).toFixed(2),
                })
                this.time_sum.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].bid),
                    total: this.SecondToHour(sumBy(data_by_branh[i], 'a_d') || 0),
                    longest: this.SecondToHour(maxBy(data_by_branh[i], 'a_d').a_d),
                    shortest: this.SecondToHour(minBy(data_by_branh[i], 'a_d').a_d),
                    average: this.SecondToHour(meanBy(data_by_branh[i], <any>'a_d')),
                })
            }
            for (var i = 0; i < len_by_date; i++) {
                var total = 0;
                data_by_date[i].forEach(v => {
                    if (v.data != null) {
                        total += +v.data.pc || 0;
                    }
                })
                this.ticket_day.push({
                    name: data_by_date[i][0].date,
                    value: total
                })
                this.time_day.push({
                    name: data_by_date[i][0].date,
                    value: this.SecondToHour(sumBy(data_by_date[i], 'a_d'))
                })
            }
        }

    }
    SecondToHour(s: number) {
        return +(s / 3600).toFixed(2);

    }


    Finalize(s: IKioskTrack[]) {
        var time = this.timechart;
        var ticket = this.ticketchart;
        this.timechart[0].series = this.time_day;
        this.ticketchart[0].series = this.ticket_day;


        if (s.length > 0) {
            this.longest_activity_time = maxBy(this.time, 'name').value;
            this.longest_activity_kiosk = maxBy(this.time, 'name').name;
            this.shortest_activity_time = minBy(this.time, 'name').value;
            this.shortest_activity_kiosk = minBy(this.time, 'name').name;
            this.average_activity_time = +meanBy(this.time, <any>'value').toFixed(2);

            this.highest_ticket_quantity = maxBy(this.ticket, 'name').value;
            this.highest_ticket_from = maxBy(this.ticket, 'name').name;
            this.lowest_ticket_quantity = minBy(this.ticket, 'name').value;
            this.lowest_ticket_from = minBy(this.ticket, 'name').name;
            this.average_printed_ticket = +meanBy(this.ticket, <any>'value').toFixed(2);
        }
        this.ticket = this.ticket.sort((a, b) => a.value - b.value).slice(0, 5);
        this.time = this.time.sort((a, b) => a.value - b.value).slice(0, 5);

    }



    static Make(records: IKioskTrack[]) {

        let res = new InfoKioskTrack();

        res.Add(records);

        res.Finalize(records);
        return res;
    }

}

