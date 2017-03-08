
export interface ITransaction {
    id: string;
    ticket_id: string;
    branch_id: string;
    branch: string;
    rating: number;
    user_id: string;
    user: string;
    counter_id: string;
    counter: string;
    service_id: string;
    service: string;
    cid: string;
    linkaudio: string;
    customer_id: string;
    vcode: string;
    cnum: string;
    lang: string;
    scode: string;
    awt: string;
    ast: string;
    state: string;
    fc_at: string; // first call
    se_at: string; // serving 
    fi_at: string; // finish
    cdate: string;
    ctime: string; // created time
    wtime: string; // waiting
    stime: string; // serving
}


export interface ITransactionView extends ITransaction {
    branch: string;
    parent: string;
    v_cdate: string;
    v_ctime: string;
    v_wtime: string;
    v_stime: string;
    v_fc_at: string;
    v_se_at: string;
    v_fi_at: string;
    v_state: string;
    audio: string;
}



export interface IService {
    name: string;
    value: number;
}
export interface IStore {
    name: string;
    value: number;
}
export interface IFre {
    name: string;
    count: number;
    cdate: string;
    date?: Date;

}

export class Customer {
    data: ITransaction[] = null;
    count: number = 0;

    name: string;
    customer_id: string;
    customer_name: string;
    customer_phone: string;
    segment: string;
   
    services: IService[] = [];
    stores: IStore[] = [];
    fres: IFre[] = [];
    branch_id: string;
    user_id: string;
    counter_id: string;
    service_id: string;
    ctime: string;
    date: Date;

    c_t = 0; // count transaction
    c_bwt = 0; // count bellow waiting time
    c_bst = 0; // count bellow serving time
    s_wt = 0; // sum waiting time
    s_st = 0; // sum serving time



    Add(s: ITransaction) {

        var month = s.cdate.substring(5, 7);
        var ps = s.stime.substring(3, 5);
        var pw = s.wtime.substring(3, 5);
        var hs = s.stime.substring(0, 2);
        var hw = s.wtime.substring(0, 2);
        this.customer_phone = "0989999999";
        this.customer_name = "Nguyen Van A";
        this.customer_id = s.customer_id;
        this.segment = "Tra Sau";
        if (this.services.length > 0) {
            for (var i = 0; i < this.services.length; i++) {
                if (s.service === this.services[i].name) {
                    this.services[i].value++;
                    break;
                } else {
                    this.services.push({
                        name: s.service,
                        value: 1,                       
                    })
                    break;
                }
            }
        } else {
            this.services.push({
                name: s.service,
                value: 1
            })
        }
        if (this.stores.length > 0) {
            for (var i = 0; i < this.stores.length; i++) {
                if (s.counter === this.stores[i].name) {
                    this.stores[i].value++;
                    break;
                } else {
                    this.stores.push({
                        name: s.counter,
                        value: 1
                    })
                    break;
                }
            }
        } else {
            this.stores.push({
                name: s.counter,
                value: 1
            })
        }
        if (this.fres.length > 0) {
            for (var i = 0; i < this.fres.length; i++) {
                if (month === this.fres[i].name) {
                    this.fres[i].count++;
                    break;
                } else {
                    this.fres.push({
                        name: month,
                        cdate: s.cdate,
                        count: 1
                    })
                    break;
                }
            }
        } else {
            this.fres.push({
                name: month,
                cdate: s.cdate,
                count: 1
            })
        }


        if (s == null) {
            return;
        }
        if (+hs > 0 || +ps > 10) {
            this.s_st = this.s_st + 1;
        }
        if (+hw > 0 || +pw > 10) {
            this.s_wt = this.s_wt + 1;
        }
        if (+hs == 0 && +ps < 10) {
            this.c_bst = this.c_bst + 1;
        }
        if (+hw == 0 && +pw < 10) {
            this.c_bwt = this.c_bwt + 1;
        }



        if (this.data === null) {
            this.data = [];
            this.branch_id = s.branch_id;
            this.user_id = s.user_id;
            this.ctime = s.ctime;
        }
        this.data.push(s);
    }

    Finalize() {
        if (this.data != null) {
            this.c_t = this.data.length;
            this.count = this.data.length;
        }

        if (this.stores != null) {

        }
        if (this.services != null) {

        }


    }

    // count 

    get c_awt() {
        return this.c_t - this.c_bwt;
    }

    // sum transaction time
    get s_tt() {
        return this.s_wt + this.s_st;
    }


    static Make(records: ITransaction[]) {

        let res = new Customer();
        records.forEach(v => {
            res.Add(v);
        });

        res.Finalize();
        return res;
    }

}

