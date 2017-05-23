import { ITransaction } from '../../../model';
import { CacheBranch } from '../../../shared';

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
    value: number;
}

export class CustomerView {
    data: ITransaction[] = null;
    count: number = 0;

    name: string;
    customer_id: string;
    services: IService[] = [];
    stores: IStore[] = [];
    fres: IFre[] = [];
    branch_id: string;
    user_id: string;
    counter_id: string;
    service_id: string;
    ctime: string;
    date: Date;
    freschart = [
        {
            "name": "Frequency",
            "series": [
            ]
        }
    ];

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
        this.customer_id = s.customer_id;
        var addservice = false;
        var addstore = false;
        var addfres = false;
        if (this.services.length > 0) {
            for (var i = 0; i < this.services.length; i++) {
                if (s.service === this.services[i].name) {
                    this.services[i].value++;
                    addservice = true;
                    break;
                } else {
                    continue;
                }
            }
            if (!addservice) {
                this.services.push({
                    name: s.service,
                    value: 1,
                })
            }
        } else {
            this.services.push({
                name: s.service,
                value: 1
            })
        }
        if (this.stores.length > 0) {
            for (var i = 0; i < this.stores.length; i++) {
                if (CacheBranch.GetNameForID(s.branch_id) === this.stores[i].name) {
                    this.stores[i].value++;
                    addstore = true;
                    break;
                } else {
                    continue;
                }
            }
            if (!addstore) {
                this.stores.push({
                    name: CacheBranch.GetNameForID(s.branch_id),
                    value: 1
                })
            }
        } else {
            this.stores.push({
                name: CacheBranch.GetNameForID(s.branch_id),
                value: 1
            })
        }
        if (this.fres.length > 0) {
            for (var i = 0; i < this.fres.length; i++) {
                if (month === this.fres[i].name) {
                    this.fres[i].value++;
                    addfres = true;
                    break;
                } else {
                    continue;
                }
            }
            if (!addfres) {
                this.fres.push({
                    name: month,
                    value: 1
                })
            }

        } else {
            this.fres.push({
                name: month,
                value: 1
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
        var fres = this.freschart;
        this.freschart[0].series = this.fres;
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

        let res = new CustomerView();
        records.forEach(v => {
            res.Add(v);
        });

        res.Finalize();
        return res;
    }

}

