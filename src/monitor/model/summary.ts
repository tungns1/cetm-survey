export interface ISummary {
    branch_id: string;
    waiting: number;
    serving: number;
    missed: number;
    cancelled: number;
    finished: number;
    wait_long: number;
    serve_short:number;
}

export class Summary {
	constructor(data?: ISummary) {
		data = data || <any>{};
		this.branch_id = data.branch_id;
		this.waiting = +data.waiting || 0;
		this.serving = +data.serving || 0;
		this.missed = +data.missed || 0;
		this.cancelled = +data.cancelled || 0;
		this.finished = +data.finished || 0;
		this.wait_long = +data.wait_long || 0;
		this.serve_short = +data.serve_short || 0;
	}

	branch_id: string;
	waiting: number;
    serving: number;
    missed: number;
    cancelled: number;
    finished: number;
    wait_long: number;
    serve_short:number;

    get printed() {
    	return this.waiting + this.serving + this.cancelled + this.finished + this.missed;
    }

    static Aggrgate(data: ISummary[]) : ISummary {
    	const s = new Summary();
    	data.forEach(d => {
    		s.waiting += d.waiting;
    		s.serving += d.serving;
    		s.missed += d.missed;
    		s.cancelled += d.cancelled;
    		s.finished += d.finished;
    		s.wait_long += d.wait_long;
    		s.serve_short += d.serve_short
    	})
    	return s;
    }

}
