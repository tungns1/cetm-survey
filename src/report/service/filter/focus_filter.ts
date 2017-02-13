export class FocusFilter {
    private service_id: string[] = [];
    private counter_id: string[] = [];
    private user_id: string[] = [];
    private group_by: string;

    constructor(data?: FocusFilter) {
        const d: IFocusFilter = data || {};
        this.service_id = this.toArray(d.service_id);
        this.counter_id = this.toArray(d.counter_id);
        this.user_id = this.toArray(d.user_id);
        this.group_by = this.getGroupBy();
    }

    private toArray(v: string | string[]) {
        if (!v) {
            return [];
        }
        return Array.isArray(v) ? v : v.split(',');
    }

    private toString(v: string[]) {
        return v.join(',');
    }

    private getGroupBy() {
        if (this.service_id.length > 0) {
            return GROUP_BYS.SERVICE_ID;
        }
        if (this.counter_id.length > 0) {
            return GROUP_BYS.COUNTER_ID;
        }
        if (this.user_id.length > 0) {
            return GROUP_BYS.USER_ID;
        }
        return GROUP_BYS.BRANCH_ID
    }

    GetValue() {
        return {
            counter_id: this.counter_id,
            service_id: this.service_id,
            user_id: this.user_id
        }
    }

    ToQuery() {
        return {
            counter_id: this.toString(this.counter_id),
            service_id: this.toString(this.service_id),
            user_id: this.toString(this.user_id),
        }
    }
}