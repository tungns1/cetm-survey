import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum } from "lodash";
import { CacheBranch } from '../../shared/model';
export interface IKioskTrack {
    id?: string
    branch_id: string;
    device_id: string;
    device_type: string;
    object: IKioskTrackData;
    state: string;
    on_at: number;
    off_at: number;
    total_on: number;
    date: string;

}

export interface IKioskTrackData {
    printed: number;
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
    total_activity = 0;
    total_activity_day = 0;
    longest_activity_time = 0;
    shortest_activity_time = 0;
    average_activity_time = 0;
    total_ticket = 0;
    highest_ticket_from = '';
    lowest_ticket_from = '';
    average_printed_ticket = 0;
    highest_ticket_quantity = 0;
    lowest_ticket_quantity = 0;





    Add(s: IKioskTrack[]) {

        if (s.length > 0) {
            this.total_activity = this.SecondToHour(sumBy(s, 'total_on'))
            this.total_kiosk = size(groupBy(s, 'device_id'));
            s.forEach(v => {
                this.total_ticket += v.object.printed || 0;
            })
            var data_by_branh = toArray(groupBy(s, 'branch_id'));


            var data_by_date = toArray(groupBy(s, 'date'));
            var len_by_date = size(data_by_date);
            var len_by_branch = size(data_by_branh);


            for (var i = 0; i < len_by_branch; i++) {
                var min = 0, max = 0, total = 0;
                data_by_branh[i].forEach(v => {
                    if (v.object.printed < min) {
                        min = +v.object.printed || 0;
                    }
                    if (v.object.printed > max) {
                        max = +v.object.printed || 0;
                    }
                    total += +v.object.printed || 0;
                })

                this.ticket.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].branch_id),
                    value: total
                })
                this.time.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].branch_id),
                    value: this.SecondToHour(sumBy(data_by_branh[i], 'total_on'))
                })
                this.ticket_sum.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].branch_id),
                    total: total,
                    highest: max,
                    lowest: min,
                    average: total / (data_by_branh[i].length),
                })
                this.time_sum.push({
                    name: CacheBranch.GetNameForID(data_by_branh[i][0].branch_id),
                    total: this.SecondToHour(sumBy(data_by_branh[i], 'total_on') || 0),
                    longest: this.SecondToHour(maxBy(data_by_branh[i], 'total_on').total_on),
                    shortest: this.SecondToHour(minBy(data_by_branh[i], 'total_on').total_on),
                    average: this.SecondToHour(meanBy(data_by_branh[i], <any>'total_on')),
                })
            }
            for (var i = 0; i < len_by_date; i++) {
                this.ticket_day.push({
                    name: data_by_date[i][0].date,
                    value: sumBy(data_by_date[i], a => +a.object.printed || 0)
                })
                this.time_day.push({
                    name: data_by_date[i][0].date,
                    value: this.SecondToHour(sumBy(data_by_date[i], 'total_on'))
                })
            }
        }

    }
    SecondToHour(s: number) {
        return +(s / 3600).toFixed(2);

    }


    Finalize(s: IKioskTrack[]) {
        if (s.length > 0) {
            this.longest_activity_time = this.SecondToHour(maxBy(this.time, 'name').value);
            this.longest_activity_kiosk = maxBy(this.time, 'name').name;
            this.shortest_activity_time = this.SecondToHour(minBy(this.time, 'name').value);
            this.shortest_activity_kiosk = minBy(this.time, 'name').name;
            this.average_activity_time = this.SecondToHour(meanBy(this.time, <any>'value'));

            this.highest_ticket_quantity = maxBy(this.ticket, 'name').value;
            this.highest_ticket_from = maxBy(this.ticket, 'name').name;
            this.lowest_ticket_quantity = minBy(this.ticket, 'name').value;
            this.lowest_ticket_from = minBy(this.ticket, 'name').name;
            this.average_printed_ticket = meanBy(this.ticket, <any>'value');
        }

    }



    static Make(records: IKioskTrack[]) {

        let res = new InfoKioskTrack();

        res.Add(records);

        res.Finalize(records);
        return res;
    }

}

