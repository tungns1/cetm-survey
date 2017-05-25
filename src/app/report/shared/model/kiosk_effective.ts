import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum } from "lodash";
import { CacheBranch, IActivity } from '../shared';

export interface IKioskEffective {
    activity: IKioskActivity[];
    ticket: ITicketKiosk[];
}

export interface IKioskActivity extends IActivity {
    data: IKioskActivityData;
}

export interface ITicketKiosk {
    date: string;
    branch_id: string;
    kiosk_id: string;
}

export interface IKioskActivityData {
    pc: number;
    ps: string;
    ps_a: number;
}

export interface ITime {
    name: string;
    value: number;
}
export interface IKioskTicketCount {
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

    data: IKioskActivity[] = [];
    ticket: IKioskTicketCount[] = [];
    time: ITime[] = [];
    ticket_day: ITicketDay[] = [];
    time_day: ITimeDay[] = [];
    ticket_sum: ITicketSum[] = [];
    time_sum: ITimeSum[] = [];
    total_kiosk = 0;
    longest_activity_kiosk = '';
    shortest_activity_kiosk = '';
    average_kiosk_eff = 0;
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
            "name": "",
            "series": [
            ]
        }
    ];
    ticketchart = [
        {
            "name": "",
            "series": [
            ]
        }
    ];





    Add(s: IKioskEffective) {

        if (s != null) {
            if (s.activity.length > 0 && s.ticket.length > 0) {
                this.total_activity_time = this.SecondToHour(sumBy(s.activity, 'a_d'))
                this.total_kiosk = size(groupBy(s.activity, 'eid'));
                this.total_ticket = s.ticket.length;
                var data_by_branh = toArray(groupBy(s.activity, 'bid'));


                var data_by_date = toArray(groupBy(s.activity, 'date'));
                var len_by_date = size(data_by_date);
                var len_by_branch = size(data_by_branh);

                var data_by_branh_t = toArray(groupBy(s.ticket, 'branch_id'));


                var data_by_date_t = toArray(groupBy(s.ticket, 'date'));
                var len_by_date_t = size(data_by_date_t);
                var len_by_branch_t = size(data_by_branh_t);


                for (var i = 0; i < len_by_branch_t; i++) {
                    console.log(len_by_branch_t);
                    var min = 0, max = 0;
                    var by_date = toArray(groupBy(data_by_branh_t[i], 'date'));
                    var len_date = size(by_date);
                    for (var i2 = 0; i2 < len_date; i2++) {
                        if (min > by_date[i2].length) {
                            min = by_date[i2].length;
                        }
                        if (max < by_date[i2].length) {
                            max = by_date[i2].length;
                        }
                    }

                    this.ticket.push({
                        name: CacheBranch.GetNameForID(data_by_branh_t[i][0].branch_id),
                        value: data_by_branh_t[i].length
                    })
                    this.ticket_sum.push({
                        name: CacheBranch.GetNameForID(data_by_branh_t[i][0].branch_id),
                        total: data_by_branh_t[i].length,
                        highest: max,
                        lowest: min,
                        average: +(data_by_branh_t[i].length / len_by_date_t).toFixed(2),
                    })
                }
                for (var i = 0; i < len_by_branch; i++) {
                    this.time.push({
                        name: CacheBranch.GetNameForID(data_by_branh[i][0].bid),
                        value: this.SecondToHour(sumBy(data_by_branh[i], 'a_d'))
                    })

                    this.time_sum.push({
                        name: CacheBranch.GetNameForID(data_by_branh[i][0].bid),
                        total: this.SecondToHour(sumBy(data_by_branh[i], 'a_d') || 0),
                        longest: this.SecondToHour(maxBy(data_by_branh[i], 'a_d').a_d),
                        shortest: this.SecondToHour(minBy(data_by_branh[i], 'a_d').a_d),
                        average: this.SecondToHour(meanBy(data_by_branh[i], <any>'a_d')),
                    })
                }
                for (var i = 0; i < len_by_date_t; i++) {
                    this.ticket_day.push({
                        name: data_by_date_t[i][0].date,
                        value: data_by_date_t[i].length
                    })
                }
                for (var i = 0; i < len_by_date; i++) {
                    this.time_day.push({
                        name: data_by_date[i][0].date,
                        value: this.SecondToHour(sumBy(data_by_date[i], 'a_d'))
                    })
                }
            }
        }

    }
    SecondToHour(s: number) {
        return +(s / 3600).toFixed(2);

    }


    Finalize(s: IKioskEffective) {
        var time = this.timechart;
        var ticket = this.ticketchart;
        this.timechart[0].series = this.time_day;
        this.ticketchart[0].series = this.ticket_day;


        if (s != null) {
            if (s.activity.length > 0 && s.ticket.length > 0) {
                this.longest_activity_time = maxBy(this.time, 'value').value;
                this.longest_activity_kiosk = maxBy(this.time, 'value').name;
                this.shortest_activity_time = minBy(this.time, 'value').value;
                this.shortest_activity_kiosk = minBy(this.time, 'value').name;
                this.average_activity_time = +meanBy(this.time, <any>'value').toFixed(2);
                this.average_kiosk_eff=+(this.total_activity_time/this.total_kiosk).toFixed(2);
                this.highest_ticket_quantity = maxBy(this.ticket, 'value').value;
                this.highest_ticket_from = maxBy(this.ticket, 'value').name;
                this.lowest_ticket_quantity = minBy(this.ticket, 'value').value;
                this.lowest_ticket_from = minBy(this.ticket, 'value').name;
                this.average_printed_ticket = +meanBy(this.ticket, <any>'value').toFixed(2);
                this.ticket = this.ticket.sort((a, b) => a.value - b.value).slice(0, 5);
                this.time = this.time.sort((a, b) => a.value - b.value).slice(0, 5);
            }
        }


    }



    static Make(records: IKioskEffective) {

        let res = new InfoKioskTrack();

        res.Add(records);

        res.Finalize(records);
        return res;
    }

}

