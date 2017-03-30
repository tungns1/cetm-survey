export interface ISummary {
	branch_id: string;
	waiting: number;
	serving: number;
	missed: number;
	cancelled: number;
	finished: number;
	wait_long: number;
	s_l: number;
}

import { CacheBranch } from '../shared';

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
		// this.serve_short = +data.serve_short || 0;
		this.s_l = +data.s_l || 0;
		const branch = CacheBranch.GetByID(this.branch_id);
		if (branch) {
			this.parent_id = branch.parent;
		}
	}

	branch_id: string;
	parent_id: string;
	waiting: number;
	serving: number;
	missed: number;
	cancelled: number;
	finished: number;
	wait_long: number;
	s_l: number;


	get printed() {
		return this.waiting + this.serving + this.cancelled + this.finished + this.missed;
	}

	static Aggregate(data: ISummary[]) {
		const s = new Summary();
		data.forEach(d => {
			s.waiting += d.waiting;
			s.serving += d.serving;
			s.missed += d.missed;
			s.cancelled += d.cancelled;
			s.finished += d.finished;
			s.wait_long += d.wait_long;
			s.s_l += d.s_l;
		})
		return s;
	}

	get wait_standard() {
		return this.waiting - this.wait_long;
	}

	get serve_standard() {
		return this.serving - this.s_l;
	}

	get wl_percent() {
		return this.waiting ? this.wait_long / this.waiting * 100 : 0;
	}

	get s_l_percent() {
		return this.serving ? this.s_l / this.serving * 100 : 0;
	}

}
