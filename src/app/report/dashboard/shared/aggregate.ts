export interface ITransactionCount {
    branch_id: string; user_id: string;
    counter_id: string; service_id: string;
    ctime: string;
    s_r: number; // sum rating
    c_t: number; // count transaction
    c_ft: number; // count finished transaction
    c_bwt: number; // count bellow waiting time
    c_bst: number; // count bellow serving time
    s_wt: number; // sum waiting time
    s_st: number; // sum serving time
    min_st: number; min_wt: number;
    max_st: number; max_wt: number;
    // rating
    c_r_gt0: number; c_r_gt4: number;
    c_r_gt6: number; c_r_gt8: number;
}

function Round2Decimal(v: number) {
    return Math.floor(v * 100) / 100;
}

export class TransactionAggregate {
    data: ITransactionCount[] = null;
    count: number = 0;

    name: string;

    branch_id: string;
    user_id: string;
    counter_id: string;
    service_id: string;
    ctime: string;
    date: Date;

    s_r = 0; // sum rating
    c_t = 0; // count transaction
    c_ft = 0; // count finished transaction
    c_bwt = 0; // count bellow waiting time
    c_bst = 0; // count bellow serving time
    s_wt = 0; // sum waiting time
    s_st = 0; // sum serving time

    a_r: number = 0;
    a_wt: number = 0;
    a_st: number = 0;

    min_st = 0; // min serving time
    min_wt = 0; // min waiting time
    max_st = 0; // max serving time
    max_wt = 0; // max waiting time

    c_r_gt0 = 0; // count rating excellent
    c_r_gt4 = 0; // count rating good
    c_r_gt6 = 0; // count rating normal
    c_r_gt8 = 0; // count rating bad




    Add(s: ITransactionCount) {
        if (s == null) {
            return;
        }

        if (this.data === null) {
            this.data = [];
            this.branch_id = s.branch_id;
            this.user_id = s.user_id;
            this.counter_id = s.counter_id;
            this.service_id = s.service_id;
            this.ctime = s.ctime;
        }
        this.data.push(s);
        this.s_r += s.s_r;
        this.c_t += s.c_t;
        this.c_ft += s.c_ft;
        this.c_bwt += s.c_bwt;
        this.c_bst += s.c_bst;
        this.s_wt += s.s_wt;
        this.s_st += s.s_st;
        this.c_r_gt0 += s.c_r_gt0;
        this.c_r_gt4 += s.c_r_gt4;
        this.c_r_gt6 += s.c_r_gt6;
        this.c_r_gt8 += s.c_r_gt8;
        if (this.min_wt > s.min_wt || this.min_wt == 0) {
            this.min_wt = s.min_wt;
        }

        if (this.min_st > s.min_st || this.min_st == 0) {
            this.min_st = s.min_st;
        }
        if (this.max_wt < s.max_wt) {
            this.max_wt = s.max_wt;
        }

        if (this.max_st < s.max_st) {
            this.max_st = s.max_st;
        }
    }

    Finalize() {
        if (this.data != null) {
            this.count = this.data.length;
        }

        if (this.c_ft > 0) {
            this.a_wt = Round2Decimal(this.s_wt / this.c_t);
            this.a_st = Round2Decimal(this.s_st / this.c_ft);
        }

        if (this.c_r_o > 0) {
            this.a_r = Round2Decimal(this.s_r / this.c_r_gt0);
        }
        return this;
    }

    // count 
    get c_ct() {
        return this.c_t - this.c_ft;
    }
    get c_awt() {
        return this.c_t - this.c_bwt;
    }
    get c_ast() {
        return this.c_t - this.c_bst;
    }

    // sum transaction time
    get s_tt() {
        return this.s_wt + this.s_st;
    }

    get c_r_o() {
        return this.c_ft - this.c_r;
    }

    get c_r() {
        return this.c_r_gt0;
    }

    get c_r_a() {
        return this.c_r_gt8;
    }

    get c_r_b() {
        return this.c_r_gt6 - this.c_r_gt8;
    }

    get c_r_c() {
        return this.c_r_gt4 - this.c_r_gt6;
    }

    get c_r_d() {
        return this.c_r_gt0 - this.c_r_gt4;
    }

    get s_st_h() {
        return Round2Decimal(this.s_st / 3600);
    }

    get s_wt_h() {
        return Round2Decimal(this.s_wt / 3600);
    }

    get s_tt_h() {
        return Round2Decimal(this.s_tt / 3600);
    }

    static Make(records: ITransactionCount[]) {
        let res = new TransactionAggregate();
        records.forEach(v => res.Add(v));
        return res.Finalize();
    }
}

export function MakeIndexBy(records: ITransactionCount[], field: string) {
    let res: { [index: string]: TransactionAggregate } = {};
    records.forEach(v => {
        let fieldValue = v[field];
        if (res[fieldValue] == null) {
            res[fieldValue] = new TransactionAggregate();
        }
        res[fieldValue].Add(v);
    })
    let values = Object.keys(res).map(k => {
        return res[k].Finalize();
    });
    return values;
}
