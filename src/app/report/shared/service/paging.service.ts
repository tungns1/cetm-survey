import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IPage {
    page: number;
    title: string;
}

export class Paging<T> {
    private count$ = new BehaviorSubject<number>(0);
    private currentPage$ = new BehaviorSubject<number>(1);
    private pageSize$ = new BehaviorSubject<number>(20);

    data$ = new BehaviorSubject<T[]>([]);
    Reset(data: T[], count: number) {
        this.data$.next(data);
        this.count$.next(count);
    }

    get Skip() {
        return this.SkipForPage(this.currentPage$.value);
    }

    SkipForPage(page: number) {
        return (page - 1) * this.pageSize$.value;
    }

    get Limit() {
        return this.pageSize$.value;
    }

    get TotalPage() {
        return Math.ceil(this.count$.value * 1.0 / this.pageSize$.value);
    }

    IsActive(p: IPage) {
        return this.currentPage$.value === p.page;
    }

    pages$ = this.count$.combineLatest(this.currentPage$, (count, current) => {
        const totalPage = this.TotalPage;
        let pages: IPage[] = [];
        if (totalPage < 1) {
            return pages;
        }
        pages.push({ page: 1, title: 'First' });
        pages = pages.concat(this.makePageRange(1, current, current - 1));
        pages = pages.concat(this.makePageRange(current + 1, totalPage, current + 1));
        pages.push({ page: totalPage, title: 'Last' });
        return pages;
    });

    info$ = this.currentPage$.map(c => `Show ${this.pageSize$.value} transactions from ${(c - 1) * this.pageSize$.value + 1} to ${c * this.pageSize$.value}`);

    SetPage(page: number) {
        if (page <= this.TotalPage && page >= 0) {
            this.currentPage$.next(page);
            return true;
        }
        return false;
    }

    private newPage(page: number) {
        const p: IPage = { page: page, title: `${page}` };
        return p;
    }

    // make page exclusive
    private makePageRange(from: number, to: number, near: number) {
        const pages: IPage[] = [];
        if (from > to) {
            return pages;
        }
        if (from == to) {
            pages.push(this.newPage(from));
            return pages;
        }
        if (from + 1 == to) {
            pages.push(this.newPage(from));
            pages.push(this.newPage(to));
            return pages;
        }
        pages.push(this.newPage(from));
        pages.push({ page: near, title: '...' });
        pages.push(this.newPage(to));
        return pages;
    }

}