import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy } from "lodash";
export interface IKioskTrack {
    id?: string
    branch_id: string;
    device_id: string;
    device_type: string;
    object: number;
    state: string;
    on_at: number;
    off_at: number;
    total_on_time: number;
    date: string;

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
            this.total_activity = sumBy(s, 'total_on_time')
            this.total_kiosk = groupBy(s, 'device_id').value.length;
            this.total_ticket = groupBy(s, 'object').value.length;
            var data_by_branh = groupBy(s, 'branch_id').value;

            var data_by_date = groupBy(s, 'date').value;
            for (var i = 0; i < data_by_branh.length; i++) {
                this.ticket.push({
                    name: data_by_branh[i].branch_id,
                    value: sumBy(data_by_branh, 'object')
                })
                this.time.push({
                    name: data_by_branh[i].branch_id,
                    value: sumBy(data_by_branh, 'total_on_time')
                })
                this.ticket_sum.push({
                    name: data_by_branh[i].branch_id,
                    total: sumBy(data_by_branh, 'object'),
                    highest: maxBy(data_by_branh, 'object').object,
                    lowest: minBy(data_by_branh, 'object').object,
                    average: meanBy(data_by_branh, <any>'object'),
                })
                this.time_sum.push({
                    name: data_by_branh[i].branch_id,
                    total: sumBy(data_by_branh, 'total_on_time'),
                    longest: maxBy(data_by_branh, 'total_on_time').total_on_time,
                    shortest: minBy(data_by_branh, 'total_on_time').total_on_time,
                    average: meanBy(data_by_branh, <any>'total_on_time'),
                })
            }
            for (var i = 0; i < data_by_date.length; i++) {
                this.ticket.push({
                    name: data_by_date[i].date,
                    value: sumBy(data_by_date, 'object')
                })
                this.time.push({
                    name: data_by_date[i].date,
                    value: sumBy(data_by_date, 'total_on_time')
                })
            }
            this.data = s;
        }

    }


    Finalize() {
        if (this.data.length > 0) {
            this.longest_activity_time = maxBy(this.time, 'name').value;
            this.longest_activity_kiosk = maxBy(this.time, 'name').name;
            this.shortest_activity_time = minBy(this.time, 'name').value;
            this.shortest_activity_kiosk = minBy(this.time, 'name').name;
            this.average_activity_time = meanBy(this.time, <any>'name');

            this.highest_ticket_quantity = maxBy(this.ticket, 'name').value;
            this.highest_ticket_from = maxBy(this.ticket, 'name').name;
            this.lowest_ticket_quantity = minBy(this.ticket, 'name').value;
            this.lowest_ticket_from = minBy(this.ticket, 'name').name;
            this.average_printed_ticket = meanBy(this.ticket, <any>'name');
        }

    }



    static Make(records: IKioskTrack[]) {

        let res = new InfoKioskTrack();

        res.Add(records);

        res.Finalize();
        return res;
    }

}

