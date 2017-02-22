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
	linkaudio:string;
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

