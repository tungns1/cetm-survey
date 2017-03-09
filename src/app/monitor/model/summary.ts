export interface ISummary {
	branch_id: string;
	waiting: number;
	serving: number;
	missed: number;
	cancelled: number;
	finished: number;
	wait_long: number;
	wl_percent: number;
	serve_short: number;
}

import { Model } from '../shared';

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
		this.wl_percent = +data.wl_percent || 0;
		this.serve_short = +data.serve_short || 0;
		if(this.wait_long >= 0 && this.waiting > 0)
			this.wl_percent = this.wait_long/ this.waiting * 100;
		else this.wl_percent = 0;

		const branch = Model.Org.CacheBranch.GetByID(this.branch_id);
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
	wl_percent: number;
	serve_short: number;


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
			s.serve_short += d.serve_short;
			if(s.wait_long >= 0 && s.waiting > 0)
				s.wl_percent = s.wait_long/ s.waiting * 100;
			else s.wl_percent = 0
		})
		return s;
	}

}