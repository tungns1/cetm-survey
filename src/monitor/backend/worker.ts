

interface IRefresh {
    Refresh();
}

export class RefreshWorker {
    constructor(private workers?: { [index: string]: IRefresh }) {
        this.workers = workers || {};
    }

    Add(name: string, worker: IRefresh) {
        this.workers[name] = worker;
    }

    Activate(name: string) {
        this.active = this.workers[name];
        return this;
    }

    Refresh() {
        this.active.Refresh();
        this.reset();
    }

    Interval(interval: number) {
        this.interval = interval;
        this.reset();
        return this;
    }

    private reset() {
        if (this.interval < 2000) {
            this.interval = 2000;
        }
        clearInterval(this.ticker);
        this.ticker = setInterval(() => this.Refresh(), this.interval);
    }


    private active: IRefresh = { Refresh: () => { } };
    private interval = 60000;
    private ticker = null;
}
