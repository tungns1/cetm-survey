export interface IKioskEff {
    branch_id: string;
    kiosk_id: string;
    total_on_time: number;
    date: string[];
    ted: number[];
    tked: number[];
}



export interface ITime {
    name: string;
    value: number;
}
export interface ITicket {
    name: string;
    value: number;
}


export class InfoKioskEff {

    data: IKioskEff[] = null;
    ticket: ITicket[] = [];
    time: ITime[] = [];
    total_kiosk = 0;
    longest_activity_kiosk = '';
    shortest_activity_kiosk = '';
    average_kiosk_eff = 0;
    total_activity = 0;
    total_activity_day = 0;
    longest_activity_time = 0;
    shortest_activity_time = 0;
    average_activity_time = 0;
    total_ticket = 0;
    total_ticket_day = 0;
    highest_ticket_from = '';
    lowest_ticket_from = '';
    average_printed_ticket = 0;
    highest_ticket_quantity = 0;
    lowest_ticket_quantity = 0;




    Add(s: IKioskEff) {
        this.total_activity += s.total_on_time;
        if (this.longest_activity_time <= s.total_on_time) {
            this.longest_activity_time = s.total_on_time;
            this.longest_activity_kiosk = s.branch_id;
        }
        if (this.shortest_activity_time >= s.total_on_time) {
            this.shortest_activity_time = s.total_on_time;
            this.shortest_activity_kiosk = s.branch_id;
        }
        if (s.tked.length > 0) {
            for (var i = 0; i < s.tked.length; i++) {
              
            }
        }



        var average_kiosk_eff = 0;

        this.data.push(s);
    }


    Finalize() {
        if (this.data.length > 0) {
            this.total_kiosk = this.data.length;
            this.average_activity_time = this.total_activity / this.total_kiosk;
        }


    }



    static Make(records: IKioskEff[]) {

        let res = new InfoKioskEff();
        records.forEach(v => {
            res.Add(v);
        });


        res.Finalize();
        return res;
    }

}

